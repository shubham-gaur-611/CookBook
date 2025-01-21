import {
  Card,
  Heading,
  Stack,
  Input,
  Button,
  Box,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { endpoints } from "@/config/api";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { CheckboxCard } from "@/components/ui/checkbox-card";

interface ReceipeFormData {
  receip_name: string;
  receip_image: string;
  instructions: string;
  ingredients: string;
  posted_by: string;
  private_receipe:string
}
export const InputCard = () => {
  const navigate = useNavigate();
  const { getUser } = useAuth();
  const user = getUser();
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<ReceipeFormData>();
  const registerMutation = useMutation({
    mutationFn: async (data: ReceipeFormData) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "receip_image" && value[0]) {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value.toString());
        }
      });
      const response = await axios.post(endpoints.create_receipe, formData);
      return response.data;
    },
    onSuccess: () => {
      alert("Receipe Created Successfully");
      navigate("/allreceipe");
    },
    onError: (er) => {
      console.log(er);
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
                placeholder="Enter Receipe Name"
                variant="subtle"
              />
            </Card.Body>

            <Card.Header>
              <Heading textStyle="xl" size="md">
                {" "}
                Upload Image
              </Heading>
            </Card.Header>
            <Card.Body borderRadius="md" color="fg.muted">
              <Input
                {...register("receip_image", {
                  required: "Image is required",
                })}
                type="file"
              />
            </Card.Body>

            <Card.Header>
              <Heading textStyle="xl" size="md">
                Add Instructions
              </Heading>
            </Card.Header>
            <Card.Body color="fg.muted">
              <Textarea
                {...register("instructions", {
                  required: "Instructions is required",
                })}
                placeholder="Enter Receipe Instruction"
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
                  required: "Ingredients is required",
                })}
                placeholder="Enter Receipe Ingredients"
                variant="subtle"
              />

              <Input
                {...register("posted_by", {
                  required: "Ingredients is required",
                })}
                value={user?.email}
                type="hidden"
                variant="subtle"
              />
            </Card.Body>

            <Card.Body color="fg.muted">
              <CheckboxCard {...register("private_receipe")} label="Make Receipe Private" maxW="240px" />
            </Card.Body>
          </Card.Root>
          <Button type="submit">Submit</Button>
        </form>
      </Stack>
    </Box>
  );
};
