import {
  Card,
  Heading,
  Stack,
  Input,
  Button,
  Box,
  Textarea,
} from "@chakra-ui/react";
import { CheckboxCard } from "@/components/ui/checkbox-card";
import axios from "axios";
import { useForm, Controller } from "react-hook-form"; // Controller is used for custom inputs
import { useMutation } from "@tanstack/react-query";
import { endpoints } from "@/config/api";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { HiUpload } from "react-icons/hi";

interface ReceipeFormData {
  receip_name: string;
  receip_image: FileList; // Update the type to FileList since it's a file input
  instructions: string;
  ingredients: string;
  posted_by: string;
  private_receipe: boolean;
}

export const InputCard = () => {
  const navigate = useNavigate();
  const { getUser } = useAuth();
  const user = getUser();
  const {
    register,
    handleSubmit,
    control, // Use control for managing custom inputs
    formState: { errors },
  } = useForm<ReceipeFormData>();

  const registerMutation = useMutation({
    mutationFn: async (data: ReceipeFormData) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "receip_image" && value.length > 0) {
          formData.append(key, value[0]); // Append the first file from the file list
        } else {
          formData.append(key, value.toString());
        }
      });

      const response = await axios.post(endpoints.create_receipe, formData);
      return response.data;
    },
    onSuccess: () => {
      alert("Recipe Created Successfully");
      navigate("/allreceipe");
    },
    onError: (er) => {
      console.error(er);
      alert("Data not entered");
    },
  });

  const onsubmit = (data: ReceipeFormData) => {
    registerMutation.mutate(data);
  };

  return (
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
              <FileUploadRoot>
                <Controller
                  name="receip_image"
                  control={control}
                  rules={{
                    required: "Image is required",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <FileUploadTrigger
                        // onClick={() => {
                        //   // Trigger the file input click programmatically
                        //   const fileInput = document.getElementById(
                        //     "file-upload-input"
                        //   ) as HTMLInputElement;
                        //   fileInput.click();
                        // }}
                        asChild
                      >
                        <Button variant="outline" size="sm">
                          <HiUpload /> Upload file
                        </Button>
                      </FileUploadTrigger>

                      {/* Hidden file input */}
                      <input
                        id="file-upload-input"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            onChange(files); // Pass the file list to react-hook-form
                          }
                        }}
                      />
                    </>
                  )}
                />
                {errors.receip_image && (
                  <span>{errors.receip_image.message}</span>
                )}
                <FileUploadList />
              </FileUploadRoot>
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
  );
};
