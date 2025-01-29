//new navbar


import { 
  Box, 
  Button, 
  Center, 
  Flex, 
  HStack, 
  Text
} from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { useContextAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUtensils } from "react-icons/fa";

interface NavbarProps {
  message: string;
}

export const Navbar: React.FC<NavbarProps> = ({ message }) => {
  const location = useLocation();
  const { user, logout } = useContextAuth();
  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState("All Recipes");
  const [navigateUrl, setNavigateUrl] = useState("/allrecipes");

  useEffect(() => {
    if (location.pathname === "/allreceipe" || location.pathname === "/") {
      setButtonText("Create Recipes");
      if (user?.email) {
        setNavigateUrl("/create_receipe");
      } else {
        setNavigateUrl("/login");
      }
    } else {
      setButtonText("All Recipes");
      setNavigateUrl("/allreceipe");
    }
  }, [location.pathname, user?.email]);

  const handleNavigate = () => {
    navigate(navigateUrl);
  };

  const handleLoginNavigate = () => {
    navigate("/login");
  };

  const handleFavoriteNavigate = () => {
    navigate("/favorite-receipes");
  };
  const handleUserNavigate = () => {
    navigate("/user-receipes");
  };

  const handleTextNavigate = () => {
    navigate("/allreceipe")
  }

  return (
    <Box
      position="fixed"
      top="0"
      width="100%"
      zIndex="1000"
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="0 2px 4px rgba(0,0,0,0.1)"
      borderBottom="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Flex 
        maxW="1400px" 
        mx="auto" 
        px={6} 
        h={16} 
        alignItems="center" 
        justifyContent="space-between"
      >
        <Center>
          <Flex alignItems="center" gap={2}>
            <FaUtensils size={24} />
            <Text
              fontSize="2xl"
              fontWeight="bold"
              cursor={"pointer"}
              onClick={handleTextNavigate}
              color={useColorModeValue('blue.500', 'blue.300')}
            >
              CookBook
            </Text>
          </Flex>
        </Center>

        <Center flex={1} mx={8}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            textAlign="center"
            color={useColorModeValue('gray.700', 'white')}
          >
            {message}
          </Text>
        </Center>

        <HStack>
          <Button
            colorScheme="teal"
            onClick={handleNavigate}
          >
            {buttonText}
          </Button>

          {user?.email ? (
            <>
              <Button
                colorScheme="pink"
                onClick={handleFavoriteNavigate}
              >
                Favorite Recipes
              </Button>

              <Button
                colorScheme="purple"
                onClick={handleUserNavigate}
              >
                User Recipes
              </Button>
              <Button
               bg={useColorModeValue('blue.500', 'blue.300')}
                colorScheme="red"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              bg={useColorModeValue('blue.500', 'blue.300')}
              colorScheme="blue"
              onClick={handleLoginNavigate}
            >
              Login
            </Button>
          )}
        </HStack>
      </Flex>
     
    </Box>
  );
};
