import {
  Card,
  Stack,
  Input,
  Button,
  AbsoluteCenter,
  defineStyle,
  Field,
  Box,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { apiCall } from "../config/apicall/apicall";
import { useContextAuth } from "../context/AuthContext";
import { Navbar } from "@/components/custom/Navbar";

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

//use yup schema for form validation
export const LoginPage = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useContextAuth();
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<LoginFormData>({ resolver: yupResolver(schema) });
  const registerMutation = useMutation({
    mutationFn: (data: LoginFormData) => apiCall("login", data),
    onSuccess: (data) => {
      toaster.success({
        title: "Login successfully",
        type: "loading",
      });
      authLogin(data.user, data.token);
      setTimeout(() => navigate("/allreceipe"), 2000);
    },
    onError: () => {
      alert("Invalid email or password");
    },
  });

  const onsubmit = (data: LoginFormData) => {
    registerMutation.mutate(data);
  };
  const handleNavigate = () => {
    navigate("/register");
  };
  return (
    <>
      <Toaster />
      <Navbar message=""/>
      <AbsoluteCenter>
        <Stack gap="4" w="500px">
          <form onSubmit={handleSubmit(onsubmit)}>
            <Card.Root maxW="lg" variant={"elevated"} key={"elevated"}>
              <Card.Header>
                <Card.Title>Sign In</Card.Title>
                <Card.Description>Welcome Back</Card.Description>
              </Card.Header>
              <Card.Body>
                <Stack gap="4" w="full">
                  <Field.Root>
                    <Box pos="relative" w="full">
                      <Input
                        {...register("email")}
                        type="email"
                        className="peer"
                        placeholder=""
                      />
                      <Field.Label css={floatingStyles}>Email</Field.Label>
                    </Box>
                  </Field.Root>
                  <Field.Root>
                    <Box pos="relative" w="full">
                      <Input
                        {...register("password")}
                        type="password"
                        className="peer"
                        placeholder=""
                      />
                      <Field.Label css={floatingStyles}>Password</Field.Label>
                    </Box>
                  </Field.Root>
                </Stack>
              </Card.Body>
              <Card.Footer justifyContent="flex-end">
                <Button onClick={handleNavigate} variant="outline">
                  Sign Up
                </Button>
                <Button type="submit" variant="solid">
                  Submit
                </Button>
              </Card.Footer>
            </Card.Root>
          </form>
        </Stack>
      </AbsoluteCenter>
    </>
  );
};

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "fg",
    top: "-3",
    insetStart: "2",
  },
});
