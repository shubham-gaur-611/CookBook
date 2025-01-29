import React from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Grid,
  HStack,
  Center,
  Icon,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { useContextAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { apiCall } from "@/config/apicall/apicall";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Recipe {
  id: string;
  receip_name: string;
  receip_image: string;
  ingredients: string;
  instructions: string;
  private_receipe: string;
  posted_by: string;
}

interface FilteredRecipesListProps {
  recipes: Recipe[];
  searchQuery: string;
  userEmail: string;
  favrecipes: Recipe[];
  refetch:UseQueryResult['refetch']
}

export const FilteredRecipesList: React.FC<FilteredRecipesListProps> = ({
  recipes,
  favrecipes,
  searchQuery,
  userEmail,
  refetch
}) => {
  const navigate = useNavigate();
  const { user } = useContextAuth();
  const queryClient = useQueryClient();

  const filteredRecipes = recipes.filter((item) => {
    const matchesSearch = item.receip_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isVisible =
      !item.private_receipe || item.private_receipe !== "on" || item.posted_by === userEmail;
    return matchesSearch && isVisible;
  });

  const handleNavigate = (id: string) => {
    navigate(`/detailedreceipe/${id}`);
  };

  const isFavorite = (recipeId: string): boolean => {
    if (!user) return false;
    return favrecipes?.some((favRecipe) => favRecipe.id === recipeId) || false;
  };

  const toggleFavoriteMutation = useMutation({
    mutationFn: async (recipeId: string) => {
      if (isFavorite(recipeId)) {
        return apiCall("unfavorite_receipes", null, recipeId, "delete");
      } else {
        return apiCall("favorite_receipes", {
          receip_id: recipeId,
          favorite_by: user?.email,
        });
      }
    },
    onSuccess: (_, recipeId) => {
      queryClient.invalidateQueries({ queryKey: ["recipes", user?.email, "favoriteRecipes"] });
      refetch();
      toaster.success({
        title: isFavorite(recipeId)
          ? "Removed from favorites"
          : "Added to favorites successfully",
        type: "success",
      });
    },
    onError: (_, recipeId) => {
      toaster.error({
        title: isFavorite(recipeId)
          ? "Failed to remove from favorites"
          : "Failed to add to favorites",
        description: "Please try again later",
        type: "error",
      });
    },
  });
  
  const handleFavoriteClick = (recipeId: string) => {
    if (!user) {
      toaster.error({
        title: "Please login",
        description: "You need to be logged in to add favorites",
        type: "error",
      });
      return;
    }
    toggleFavoriteMutation.mutate(recipeId);
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
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((item) => (
              <Box
                key={item.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                bg={isFavorite(item.id) ? "orange.100" : "whitesmoke"}
                maxW="250px"
                maxH="fit-content"
                _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
                shadow="lg"
                position="relative"
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
                  <Text
                    fontWeight="bold"
                    color="gray.600"
                    fontSize="lg"
                    mb={2}
                  >
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
                  <Icon
                    as={isFavorite(item.id) ? AiFillHeart : AiOutlineHeart}
                    color="red.500"
                    boxSize={6}
                    cursor="pointer"
                    onClick={() => handleFavoriteClick(item.id)}
                    _hover={{ transform: "scale(1.1)" }}
                    transition="transform 0.2s"
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
