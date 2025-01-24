import React, { useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { apiCall } from "@/config/apicall/apicall";

interface Recipe {
  id: string;
  receip_name: string;
  receip_image: string;
  ingredients: string;
  instructions: string;
  private_receipe: string;
  posted_by: string;
}

interface FavoriteFilteredRecipesListProps {
  recipes: Recipe[];
  searchQuery: string;
  userEmail: string;
}

export const FavoriteFilteredRecipesList: React.FC<
  FavoriteFilteredRecipesListProps
> = ({ recipes, searchQuery, userEmail }) => {
  const navigate = useNavigate();
  const { user } = useContextAuth();

  const [filteredRecipes, setFilteredRecipes] = useState(() =>
    recipes.filter((item) => {
      const matchesSearch = item.receip_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isVisible =
        item.private_receipe !== "on" || item.posted_by === userEmail;
      return matchesSearch && isVisible;
    })
  );

  const handleNavigate = (id: any) => {
    navigate(`/detailedreceipe/${id}`);
  };

  const deleteFavoriteMutation = useMutation({
    mutationFn: (id: string) =>
      apiCall("unfavorite_receipes", "cd", id, user?.email),
      onSuccess: (_, id) => {
        toaster.success({
            title: "UnFollowed Successfully",
            type: "loading",
          });
      setFilteredRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    },
    onError: (err) => {
      alert(err);
    },
  });

  const handleUnFavorite = (id: string) => {
    if (user?.email) {
      deleteFavoriteMutation.mutate(id);
    } else {
      console.error("User is not logged in!");
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
        bg="gray.600"
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
                maxW="300px"
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
                  bg="gray.700"
                  borderTop="1px solid"
                  borderColor="gray.600"
                >
                  <Button
                    size="sm"
                    colorScheme="orange"
                    onClick={() => handleNavigate(item.id)}
                  >
                    Read More
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="orange"
                    onClick={() => handleUnFavorite(item.id)}
                  >
                    UnFavorite
                  </Button>
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
