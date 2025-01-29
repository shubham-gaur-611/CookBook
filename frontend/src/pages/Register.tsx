import { Card, Stack, Input, Button, AbsoluteCenter, Field, defineStyle, Box } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
//import { Field } from "@/components/ui/field";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { apiCall } from "../config/apicall/apicall";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface RegisterFormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<RegisterFormData>({ resolver: yupResolver(schema) });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormData) => apiCall("register", data),
    onSuccess: () => {
      toaster.loading({
        title: "Registering...",
        description: "Please wait while we process your registration.",
        duration: 1000,
      });
      setTimeout(
        () =>
          toaster.success({
            title: "Registration Successful",
            description: "Redirecting to login...",
          }),
        2000
      );
      setTimeout(() => navigate("/login"), 3000);
    },
  });

  const onsubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  const handleNavigate = () => {
    navigate("/login");
  };
  return (
    <>
      <Toaster />
      <AbsoluteCenter>
        <Stack gap="4" w="500px">
          <form onSubmit={handleSubmit(onsubmit)}>
            <Card.Root maxW="lg" variant={"elevated"} key={"elevated"}>
              <Card.Header>
                <Card.Title>Sign Up</Card.Title>
                <Card.Description>Register User</Card.Description>
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
                  Sign In
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