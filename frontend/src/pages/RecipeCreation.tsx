import { HStack, Center, Box } from "@chakra-ui/react";

import { InputCard } from "../components/custom/InputCard";
import { Navbar } from "../components/custom/Navbar";

export function RecipeCreation() {
  return (
    <>
      <Navbar message="Receipe Creation Page" />
      <Box>
        <Center>
          <HStack wrap="wrap" gap="6"></HStack>
        </Center>
        <InputCard />
      </Box>
    </>
  );
}
