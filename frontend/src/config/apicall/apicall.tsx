import axios from "axios";
import { endpoints } from "../api";

export const apiCall = async (
  url: string,
  data?: any,
  id?: string,
  email?: string
) => {
  let endpoint = endpoints[url];

  if (id && email) {
    endpoint = endpoint(id,email);
    const response = await axios.delete(endpoint);
    return response.data;
  }

  if (id) {
    endpoint = endpoint(id);
    const response = await axios.get(endpoint);
      return response.data;
  }
  if (!data) {
    const response = await axios.get(endpoint);
    return response.data;
  } else {
    const response = await axios.post(endpoint, data);
    return response.data;
  }
};
