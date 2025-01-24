import { useState } from "react";
import { HStack, Input, Kbd, Flex } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../components/custom/Navbar";
import { InputGroup } from "@/components/ui/input-group";
import { FilteredRecipesList } from "../components/custom/FilteredRecipesList";
import { apiCall } from "../config/apicall/apicall";
import { useContextAuth } from "@/context/AuthContext";
export const AllReceipe = () => {
  // const { getUser } = useAuth();
  // const user = getUser();
  const { user } = useContextAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: receipes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["receipes"], 
    queryFn: () => apiCall("get_receipe"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading receipes.</div>;
  }

  return (
    <>
      <Navbar message="Receipes" />

      <HStack
        gap="10"
        m="10px"
        bg="white"
        borderRadius="lg"
        width="fit-content"
      >
        <InputGroup
          flex="1"
          startElement={<LuSearch />}
          endElement={<Kbd>⌘K</Kbd>}
          color="black"
        >
          <Input
            placeholder="Search recipes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </HStack>

      <Flex wrap="wrap" justify="space-between" gap={4} p={8}>
        <FilteredRecipesList
          recipes={receipes}
          searchQuery={searchQuery}
          userEmail={user?.email || ""}
        />
      </Flex>
    </>
  );
};
