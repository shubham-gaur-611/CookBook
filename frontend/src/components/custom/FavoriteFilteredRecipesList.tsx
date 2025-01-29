import React, { useState, useEffect } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCall } from "@/config/apicall/apicall";
import { AiFillHeart } from "react-icons/ai";

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
  favrecipes: Recipe[];
  searchQuery: string;
  userEmail: string;
}

export const FavoriteFilteredRecipesList: React.FC<
  FavoriteFilteredRecipesListProps
> = ({ favrecipes, searchQuery, userEmail }) => {
  const navigate = useNavigate();
  const { user } = useContextAuth();
  const queryClient = useQueryClient();

  const [filteredRecipes, setFilteredRecipes] = useState(favrecipes);

  useEffect(() => {
    const filtered = favrecipes.filter((item) => {
      const matchesSearch = item.receip_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isVisible =
        item.private_receipe !== "on" || item.posted_by === userEmail;
      return matchesSearch && isVisible;
    });
    setFilteredRecipes(filtered);
  }, [searchQuery, favrecipes, userEmail]);

  const handleNavigate = (id: string) => {
    navigate(`/detailedreceipe/${id}`);
  };

  const deleteFavoriteMutation = useMutation({
    mutationFn: (id: string) =>
      apiCall("unfavorite_receipes", "cd", id, "delete"),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["favoriteRecipes", user?.email] });
      toaster.success({
        title: "Removed From Favorite List",
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
        bg="#f3f3f3"
        width="100%"
      >
        <Grid templateColumns="repeat(4, 1fr)" gap={6} p={4}>
          {filteredRecipes && filteredRecipes.length > 0 ? (
            filteredRecipes.map((item) => (
              <Box
              key={item.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              bg={"whitesmoke"}
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
                  <Icon
                    as={AiFillHeart}
                    color="red.500"
                    boxSize={6}
                    cursor="pointer"
                    onClick={() => handleUnFavorite(item.id)}
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
