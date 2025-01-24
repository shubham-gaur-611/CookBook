import {
  Card,
  Heading,
  Stack,
  Input,
  Button,
  Box,
  Textarea,
  FileUploadHiddenInput,
  FileUploadRootProvider,
  useFileUpload,
} from "@chakra-ui/react";
import { FileUploadList, FileUploadTrigger } from "@/components/ui/file-upload";
import { CheckboxCard } from "@/components/ui/checkbox-card";
import { HiUpload } from "react-icons/hi";
import { Toaster, toaster } from "@/components/ui/toaster";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiCall } from "../../config/apicall/apicall";

import { useContextAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface ReceipeFormData {
  receip_name: string;
  instructions: string;
  ingredients: string;
  posted_by: string;
  private_receipe: boolean;
}

export const InputCard = () => {
  const navigate = useNavigate();
  // const { getUser } = useAuth();
  // const user = getUser();
  const { user } = useContextAuth();

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<ReceipeFormData>();

  const receipesMutation = useMutation({
    mutationFn: async (data: ReceipeFormData) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      fileUpload.acceptedFiles.forEach((file) => {
        formData.append("receip_image", file);
      });

      const response = await apiCall("create_receipe", formData);
      return response.data;
    },
    onSuccess: () => {
      toaster.success({
        title: "Receipe Created successfully",
        type: "loading",
      });
      setTimeout(() => navigate("/allreceipe"), 2000);
    },
    onError: (er) => {
      console.error(er);
      alert("Data not entered");
    },
  });
  const onsubmit = (data: ReceipeFormData) => {
    receipesMutation.mutate(data);
  };
  const fileUpload = useFileUpload({
    maxFiles: 1,
  });

  return (
    <>
      <Toaster />
      <Box p={6} maxW="800px" mx="auto" mt={10}>
        <Stack>
          <form onSubmit={handleSubmit(onsubmit)}>
            <Card.Root style={{ marginBottom: "10px" }} size="md">
              <Card.Header>
                <Heading textStyle="xl" size="md">
                  Recipe Name
                </Heading>
              </Card.Header>
              <Card.Body color="fg.muted">
                <Input
                  {...register("receip_name", {
                    required: "Name is required",
                  })}
                  placeholder="Enter Recipe Name"
                  variant="subtle"
                />
              </Card.Body>

              <Card.Header>
                <Heading textStyle="xl" size="md">
                  Upload Image
                </Heading>
              </Card.Header>
              <Card.Body borderRadius="md" color="fg.muted">
                <FileUploadRootProvider value={fileUpload}>
                  <FileUploadHiddenInput />
                  <FileUploadTrigger asChild>
                    <Button variant="outline" size="sm">
                      <HiUpload /> Upload file
                    </Button>
                  </FileUploadTrigger>
                  <FileUploadList />
                </FileUploadRootProvider>
              </Card.Body>

              <Card.Header>
                <Heading textStyle="xl" size="md">
                  Add Instructions
                </Heading>
              </Card.Header>
              <Card.Body color="fg.muted">
                <Textarea
                  {...register("instructions", {
                    required: "Instructions are required",
                  })}
                  placeholder="Enter Recipe Instructions"
                  variant="subtle"
                />
              </Card.Body>

              <Card.Header>
                <Heading textStyle="xl" size="md">
                  Add Ingredients
                </Heading>
              </Card.Header>
              <Card.Body color="fg.muted">
                <Input
                  {...register("ingredients", {
                    required: "Ingredients are required",
                  })}
                  placeholder="Enter Recipe Ingredients"
                  variant="subtle"
                />
                <Input
                  {...register("posted_by", {
                    required: "User is required",
                  })}
                  value={user?.email}
                  type="hidden"
                  variant="subtle"
                />
              </Card.Body>

              <Card.Body color="fg.muted">
                <CheckboxCard
                  {...register("private_receipe")}
                  label="Make Recipe Private"
                  maxW="240px"
                />
              </Card.Body>
            </Card.Root>
            <Button type="submit" colorScheme="blue" mt={4}>
              Submit
            </Button>
          </form>
        </Stack>
      </Box>
    </>
  );
};
