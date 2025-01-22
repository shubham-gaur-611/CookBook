import {
  Card,
  Stack,
  Input,
  Button,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster"
import { Field } from "@/components/ui/field";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { endpoints } from "@/config/api";

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
    mutationFn: async (data: RegisterFormData) => {
      const response = await axios.post(endpoints.register, data);
      return response.data;
    },
    onSuccess: () => {
      toaster.loading({
        title: "Registering...",
        description: "Please wait while we process your registration.",
        duration: 1000,
      });
      setTimeout(()=>toaster.success({
        title: "Registration Successful",
        description: "Redirecting to login...",
      }),2000)
      setTimeout(()=>navigate("/login"),3000)
    },
  });

  const onsubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data)
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
          <Card.Root maxW="lg">
            <Card.Header>
              <Card.Title>Sign Up</Card.Title>
              <Card.Description>Register User</Card.Description>
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
