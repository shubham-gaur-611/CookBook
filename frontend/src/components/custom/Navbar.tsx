import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";

import { useAuth } from "../../hooks/useAuth";
// import { MenuBox } from "./Menu";

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface NavbarProps {
  message: string;
}

export const Navbar: React.FC<NavbarProps> = ({ message }) => {
  const location = useLocation();

  const { logout, getUser } = useAuth();
  const user = getUser();
  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState("All Recipes");
  const [navigateUrl, setNavigateUrl] = useState("/allrecipes");

  useEffect(() => {
    if (location.pathname === "/allreceipe" || location.pathname === "/") {
      setButtonText("Create Receipes");
      if (user?.email) {
        setNavigateUrl("/create_receipe");
      } else {
        setNavigateUrl("/login");
      }
    } else {
      setButtonText("All Recipes");
      setNavigateUrl("/allreceipe");
    }
  }, [location.pathname]);

  const handleNavigate = () => {
    navigate(navigateUrl);
  };
  return (
    <Box bg="red.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex flex={1} justifyContent="center">
          <Text fontSize="2xl" fontWeight="bold" color="white">
            {message}
          </Text>
        </Flex>
        <HStack alignItems="center" display={{ base: "none", md: "flex" }}>
          {/* <MenuBox /> */}
          <Button onClick={handleNavigate}>{buttonText}</Button>
          {user?.email ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Button onClick={handleNavigate}>Login</Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};
