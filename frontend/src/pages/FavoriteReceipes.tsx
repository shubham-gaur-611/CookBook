import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../components/custom/Navbar";
import { apiCall } from "../config/apicall/apicall";
import { useContextAuth } from "@/context/AuthContext";
import {
  Center,
  Flex,
  HStack,
  Input,
  Kbd,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { InputGroup } from "@/components/ui/input-group";
import { FavoriteFilteredRecipesList } from "@/components/custom/FavoriteFilteredRecipesList";
import { Box } from "@chakra-ui/react";
interface Recipe {
  id: string;
  receip_name: string;
  receip_image: string;
  ingredients: string;
  instructions: string;
  private_receipe: string;
  posted_by: string;
}

export const FavoriteReceipes = () => {
  const { user } = useContextAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: favRecipes,
    isLoading,
    isError,
    error: errorData,
  } = useQuery<Recipe[]>({
    queryKey: ["favoriteRecipes", user?.email],
    queryFn: () => apiCall("get_favorite_receipes", null, user?.email),
    enabled: !!user?.email,
    retry: 3,
    staleTime: 300000,
  });

  if (isLoading) {
    return (
      <Center h="100vh">
        <Flex direction="column" align="center" gap={4}>
          <Spinner size="xl" color="teal.500" />
          <Text>Loading favorite recipes...</Text>
        </Flex>
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="100vh">
        <Flex direction="column" align="center" gap={4}>
          <Text color="red.500" fontSize="lg">
            Error loading favorite recipes
          </Text>
          <Text color="gray.600" fontSize="sm">
            {(errorData as Error)?.message || "Please try again later"}
          </Text>
        </Flex>
      </Center>
    );
  }

  return (
    <>
      <Navbar message="Favorite Recipes" />
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
                placeholder="Search favorite recipes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </HStack>
        </Center>
      </Box>

      <Flex wrap="wrap" justify="space-between" gap={4} p={8}>
        {favRecipes && (
          <FavoriteFilteredRecipesList
            favrecipes={favRecipes}
            searchQuery={searchQuery}
            userEmail={user?.email || ""}
          />
        )}
      </Flex>
    </>
  );
};
