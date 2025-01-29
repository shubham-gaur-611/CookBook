import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Grid,
  HStack,
  Center,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { useContextAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCall } from "@/config/apicall/apicall";
import { IoTrashOutline } from "react-icons/io5";

interface Recipe {
  id: string;
  receip_name: string;
  receip_image: string;
  ingredients: string;
  instructions: string;
  private_receipe: string;
  posted_by: string;
}

interface UserReceipeListProps {
  recipes: Recipe[];
  searchQuery: string;
  userEmail: string;
  refetch: () => void;
}

export const UserFilteredReceipeList: React.FC<
UserReceipeListProps
> = ({ recipes, searchQuery, userEmail, refetch }) => {
  const navigate = useNavigate();
  const { user } = useContextAuth();
  const queryClient = useQueryClient();

  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    const filtered = recipes.filter((item) => {
      const matchesSearch = item.receip_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isVisible =
        item.private_receipe !== "on" || item.posted_by === userEmail;
      return matchesSearch && isVisible;
    });
    setFilteredRecipes(filtered);
  }, [recipes, searchQuery, userEmail]);

  const handleNavigate = (id: any) => {
    navigate(`/detailedreceipe/${id}`);
  };

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) =>
      apiCall("delete_receipe", null, id, "delete"),
    onSuccess: async (_, id) => {
      // First update the local state
      setFilteredRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
      
      // Then invalidate queries
      await queryClient.invalidateQueries({ queryKey: ["userRecipes"] });
      await queryClient.invalidateQueries({ queryKey: ["recipes"] });
      
      // Finally, refetch to ensure we have the latest data
      await refetch();
      
      toaster.success({
        title: "Recipe Deleted Successfully",
        type: "success",
      });
    },
    onError: (err) => {
      toaster.error({
        title: "Error Deleting Recipe",
        description: err instanceof Error ? err.message : "An error occurred",
        type: "error",
      });
    },
  });

  const handleUserReceipes = (id: string) => {
    if (user?.email) {
      deleteUserMutation.mutate(id);
    } else {
      toaster.error({
        title: "Authentication Error",
        description: "You must be logged in to delete recipes",
        type: "error",
      });
    }
  };

  return (
    <>
      <Toaster />
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        bg="#f3f3f3"
        width="100%"
      >
        <Grid templateColumns="repeat(4, 1fr)" gap={6} p={4}>
          {recipes && recipes.length > 0 ? (
            filteredRecipes.map((item) => (
              <Box
                key={item.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                bg="whitesmoke"
                maxW="250px"
                maxH="fit-content"
                _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
                shadow="lg"
              >
                <Center>
                  <Image
                    src={`http://localhost:3000${item.receip_image}`}
                    alt={item.receip_name}
                    borderRadius="md"
                    p={4}
                  />
                </Center>
                <Center>
                  <Text fontWeight="bold" color="gray.600" fontSize="lg" mb={2}>
                    {item.receip_name}
                  </Text>
                </Center>

                <HStack
                  justify="space-between"
                  p={4}
                  borderTop="1px solid"
                  borderColor="gray.200"
                >
                  <Button
                    size="sm"
                    onClick={() => handleNavigate(item.id)}
                    bg="#445597"
                  >
                    Read More
                  </Button>
                  <IoTrashOutline
                    size="24px" 
                    color="blue"
                    cursor="pointer"
                    onClick={() => handleUserReceipes(item.id)}
                  />
                </HStack>
              </Box>
            ))
          ) : (
            <Text color="gray.400" fontSize="lg" textAlign="center">
            No recipes available.
          </Text>
          )}
        </Grid>
      </Box>
    </>
  );
};
