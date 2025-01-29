import { useState } from "react";
import {
  HStack,
  Input,
  Kbd,
  Flex,
  Center,
  Spinner,
  Text,
  Box,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../components/custom/Navbar";
import { InputGroup } from "@/components/ui/input-group";
import { FilteredRecipesList } from "../components/custom/FilteredRecipesList";
import { apiCall } from "../config/apicall/apicall";
import { useContextAuth } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
interface Recipe {
  id: string;
  receip_name: string;
  receip_image: string;
  ingredients: string;
  instructions: string;
  private_receipe: string;
  posted_by: string;
}

export const AllReceipe = () => {
  // const { getUser } = useAuth();
  // const user = getUser();
  const { user } = useContextAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: recipes,
    isLoading: recipesLoading,
    isError: recipesError,
    error: recipesErrorData,
  } = useQuery<Recipe[]>({
    queryKey: ["recipes"],
    queryFn: () => apiCall("get_receipe"),
    retry: 3,
  });

  const {
    data: favRecipes,
    isLoading: favRecipesLoading,
    isError: favRecipesError,
    error: favRecipesErrorData,
    refetch,
  } = useQuery<Recipe[]>({
    queryKey: ["favoriteRecipes", user?.email],
    queryFn: () => apiCall("get_favorite_receipes"),
    enabled: !!user?.email,
    retry: 3,
  });

  const isLoading = recipesLoading || favRecipesLoading;
  const isError = recipesError || favRecipesError;

  if (isLoading) {
    return (
      <Center h="100vh">
        <Flex direction="column" align="center" gap={4}>
          <Spinner size="xl" color="teal.500" />
          <Text>Loading recipes...</Text>
        </Flex>
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="100vh">
        <Flex direction="column" align="center" gap={4}>
          <Text color="red.500" fontSize="lg">
            Error loading recipes
          </Text>
          <Text color="gray.600" fontSize="sm">
            {(recipesErrorData as Error)?.message ||
              (favRecipesErrorData as Error)?.message ||
              "Please try again later"}
          </Text>
        </Flex>
      </Center>
    );
  }

  return (
    <>
      <Navbar message="All Recipes" />
      <Box pt="80px">
        <Center>
          <HStack
            gap="10"
            m="10px"
            rounded={10}
            width="32em"
            position="relative"
            zIndex="1"
          >
            <InputGroup
              flex="1"
              startElement={<LuSearch />}
              endElement={<Kbd>⌘K</Kbd>}
              color="black"
            >
              <Input
                placeholder="Search recipes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </HStack>
        </Center>
        <FilteredRecipesList
          recipes={recipes || []}
          favrecipes={favRecipes || []}
          searchQuery={searchQuery}
          userEmail={user?.email || ""}
          refetch={refetch}
        />
      </Box>
      <Toaster />
    </>
  );
};
