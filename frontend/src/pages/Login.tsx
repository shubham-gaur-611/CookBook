import { Card, Stack, Input, Button, AbsoluteCenter } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Toaster, toaster } from "@/components/ui/toaster";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { apiCall } from '../config/apicall/apicall'
import {useContextAuth} from '../context/AuthContext'

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
      authLogin(data.user, data.token, data.expiresIn);
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
      <AbsoluteCenter>
        <Stack gap="4" w="500px">
          <form onSubmit={handleSubmit(onsubmit)}>
            <Card.Root maxW="lg">
              <Card.Header>
                <Card.Title>Sign In</Card.Title>
                <Card.Description>Welcome Back</Card.Description>
              </Card.Header>
              <Card.Body>
                <Stack gap="4" w="full">
                  <Field label="First Name">
                    <Input
                      type="email"
                      {...register("email")}
                      placeholder="Enter Email"
                    />
                  </Field>
                  <Field label="Password">
                    <Input
                      type="password"
                      {...register("password")}
                      placeholder="Enter Password"
                    />
                  </Field>
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
