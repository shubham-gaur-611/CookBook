import {
  Card,
  Image,
  Text,
  Button,
  Center,
  Box,
  Grid,
  AbsoluteCenter,
} from "@chakra-ui/react";

import { endpoints } from "@/config/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../components/custom/Navbar";

export const AllReceipe = () => {
  const { getUser } = useAuth();
  const user = getUser();

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + " ..."
      : text;
  };
  const navigate = useNavigate();
  const {
    data: receipes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["receipes"],
    queryFn: async () => {
      const response = await axios.get(endpoints.get_receipe);
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading receipes.</div>;
  }

  const pageName = "Receipes";
  const handleNavigate = (id:any) => {
    navigate(`/detailedreceipe/${id}`)
  }

  return (
    <>
      <Navbar message={pageName} />
      <AbsoluteCenter>
        <Box background="tomato" width="100%" padding="4" color="white">
          <Grid templateColumns="repeat(3, 1fr)" gap="6">
            {receipes && receipes.length > 0 ? (
              receipes.map((item: any) =>
                user?.email ? (
                  <div key={item.id}>
                    <Card.Root maxW="sm" overflow="hidden">
                      <Image
                        src={`http://localhost:3000${item.receip_image}`}
                        alt={item.receip_name || "Recipe Image"}
                      />
                      <Card.Body gap="2">
                        <Center>
                          <Text
                            textStyle="2xl"
                            fontWeight="medium"
                            letterSpacing="tight"
                            mt="2"
                          >
                            {item.receip_name}
                          </Text>
                        </Center>
                        <Card.Title>Ingredients :</Card.Title>
                        <Card.Description>
                          {truncateText(item.ingredients, 5)}
                        </Card.Description>
                        <Card.Title>Instruction :</Card.Title>
                        <Card.Description>
                          {truncateText(item.instructions, 5)}
                        </Card.Description>
                      </Card.Body>
                      <Card.Footer gap="2">
                      <Button onClick={() => handleNavigate(item.id)} variant="solid">Read More</Button>
                      </Card.Footer>
                    </Card.Root>
                  </div>
                ) : item.private_receipe !== "on" ? (
                  <div key={item.id}>
                    <Card.Root maxW="sm" overflow="hidden">
                      <Image
                        src={`http://localhost:3000${item.receip_image}`}
                        alt={item.receip_name || "Recipe Image"}
                      />
                      <Card.Body gap="2">
                        <Center>
                          <Text
                            textStyle="2xl"
                            fontWeight="medium"
                            letterSpacing="tight"
                            mt="2"
                          >
                            {item.receip_name}
                          </Text>
                        </Center>
                        <Card.Title>Ingredients :</Card.Title>
                        <Card.Description>
                          {truncateText(item.ingredients, 5)}
                        </Card.Description>
                        <Card.Title>Instruction :</Card.Title>
                        <Card.Description>
                          {truncateText(item.instructions, 5)}
                        </Card.Description>
                      </Card.Body>
                      <Card.Footer gap="2">
                      <Button onClick={() => handleNavigate(item.id)} variant="solid">Read More</Button>
                      </Card.Footer>
                    </Card.Root>
                  </div>
                ) : null
              )
            ) : (
              <div>No receipes available.</div>
            )}
          </Grid>
        </Box>
      </AbsoluteCenter>
    </>
  );
};
