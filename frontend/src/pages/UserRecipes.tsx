import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../components/custom/Navbar";
import { apiCall } from "../config/apicall/apicall";
import { useContextAuth } from "@/context/AuthContext";
import { Center, Flex, HStack, Input, Kbd, Spinner, Text } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { InputGroup } from "@/components/ui/input-group";
import { UserFilteredReceipeList } from "@/components/custom/UserFilteredReceipes";
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

export const UserRecipes = () => {
  const { user } = useContextAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: recipes,
    isLoading,
    isError,
    error: errorData,
    refetch
  } = useQuery<Recipe[]>({
    queryKey: ["userRecipes", user?.email],
    queryFn: () => apiCall("get_user_recipe", null, user?.email),
    enabled: !!user?.email,
    retry: 3,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 0 // Always fetch fresh data
  });

  if (isLoading) {
    return (
      <Center h="100vh">
        <Flex direction="column" align="center" gap={4}>
          <Spinner size="xl" color="teal.500" />
          <Text>Loading your recipes...</Text>
        </Flex>
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="100vh">
        <Flex direction="column" align="center" gap={4}>
          <Text color="red.500" fontSize="lg">Error loading your recipes</Text>
          <Text color="gray.600" fontSize="sm">
            {(errorData as Error)?.message || "Please try again later"}
          </Text>
        </Flex>
      </Center>
    );
  }

  return (
    <>
      <Navbar message="Your Recipes" />
      <Box pt="80px">
      <Center>
        <HStack gap="10" m="10px" rounded={10} width="32em">
          <InputGroup
            flex="1"
            startElement={<LuSearch />}
            endElement={<Kbd>⌘K</Kbd>}
            color="black"
          >
            <Input
              placeholder="Search your recipes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </HStack>
      </Center>
      </Box>
      <Flex wrap="wrap" justify="space-between" gap={4} p={8}>
        {recipes && (
          <UserFilteredReceipeList
            key={recipes.length} // Force re-render when recipes change
            recipes={recipes}
            searchQuery={searchQuery}
            userEmail={user?.email || ""}
            refetch={refetch}
          />
        )}
      </Flex>
    </>
  );
};
