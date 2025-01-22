import {
  Stack,
  Image,
  Text,
  Center,
  Box,
  Container,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { endpoints } from "@/config/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { Navbar } from "@/components/custom/Navbar";


interface Recipe {
  receip_name: string;
  receip_image: string;
  instructions: string;
  ingredients: string;
  posted_by: string;
}

export const DetailedReceipe = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: receipe,
    isLoading,
    isError,
  } = useQuery<Recipe>({
    queryKey: ["receipe", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("ID is missing");
      }
      const response = await axios.get<Recipe>(endpoints.receipe_id(id));
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <Center h="100vh">
        <Text fontSize="xl">Loading...</Text>
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="100vh">
        <Text fontSize="xl" color="red.500">
          Error loading recipe.
        </Text>
      </Center>
    );
  }

  if (!receipe) {
    return (
      <Center h="100vh">
        <Text fontSize="xl" color="red.500">
          Recipe not found.
        </Text>
      </Center>
    );
  }
  const receipeName = receipe.receip_name;
  return (
    <>
      <Navbar message={receipeName} />
      <Box minH="100vh" py={8}>
        <Container maxW="6xl">
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1.2fr" }} gap={8}>
            <GridItem>
              <Box
                bg="white"
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="lg"
              >
                <Image
                  src={`http://localhost:3000${receipe.receip_image}`}
                  alt={receipe.receip_name}
                  w="100%"
                  h="400px"
                  objectFit="cover"
                />
              </Box>
            </GridItem>

            <GridItem>
              <Stack>
                <Box
                  bg="white"
                  p={6}
                  borderRadius="xl"
                  boxShadow="lg"
                  borderTop="4px solid"
                  borderColor="orange.400"
                >
                  <Heading size="md" color="orange.500" mb={4}>
                    Ingredients
                  </Heading>
                  <Text fontSize="lg" lineHeight="tall" color="gray.700">
                    {receipe.ingredients}
                  </Text>
                </Box>
                <Box
                  bg="white"
                  p={6}
                  borderRadius="xl"
                  boxShadow="lg"
                  borderTop="4px solid"
                  borderColor="teal.400"
                >
                  <Heading size="md" color="teal.500" mb={4}>
                    Instructions
                  </Heading>
                  <Text
                    fontSize="lg"
                    lineHeight="tall"
                    color="gray.700"
                    whiteSpace="pre-wrap"
                    textAlign="justify"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {receipe.instructions}
                  </Text>
                </Box>
              </Stack>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
