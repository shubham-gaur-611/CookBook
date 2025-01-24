import React from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Grid,
  HStack,
  Center,
} from "@chakra-ui/react";
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

interface FilteredRecipesListProps {
  recipes: Recipe[];
  searchQuery: string;
  userEmail: string;
}
interface FavoriteReceipe {
  receip_id: string;
  favorite_by: string;
}
export const FilteredRecipesList: React.FC<FilteredRecipesListProps> = ({
  recipes,
  searchQuery,
  userEmail,
}) => {
  const navigate = useNavigate();
  const { user } = useContextAuth();

  // const truncateText = (text: string, wordLimit: number) => {
  //   const words = text.split(" ");
  //   return words.length > wordLimit
  //     ? words.slice(0, wordLimit).join(" ") + " ..."
  //     : text;
  // };

  const filteredReceipes = recipes.filter((item) => {
    const matchesSearch = item.receip_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isVisible =
      item.private_receipe !== "on" || item.posted_by === userEmail;
    return matchesSearch && isVisible;
  });

  const handleNavigate = (id: any) => {
    navigate(`/detailedreceipe/${id}`);
  };

  const favoriteMutation = useMutation({
    mutationFn: (data: FavoriteReceipe) => apiCall("favorite_receipes", data),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleFavorite = (id: any) => {
    if (user?.email) {
      let result: FavoriteReceipe = { receip_id: id, favorite_by: user?.email };
      favoriteMutation.mutate(result);
    } else {
      console.error("User is not logged in!");
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg="gray.600"
      width="100%"
    >
      <Grid templateColumns="repeat(4, 1fr)" gap={6} p={4}>
        {filteredReceipes.length > 0 ? (
          filteredReceipes.map((item) => (
            <>
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
                    alt="{title}"
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
                    onClick={() => handleFavorite(item.id)}
                  >
                    Favorite
                  </Button>
                </HStack>
              </Box>
            </>
          ))
        ) : (
          <Text color="gray.400" fontSize="lg" textAlign="center">
            No recipes available.
          </Text>
        )}
      </Grid>
    </Box>
  );
};
