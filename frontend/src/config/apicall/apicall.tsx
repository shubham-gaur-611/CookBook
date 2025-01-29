import axios from "axios";
import { endpoints } from "../api";

export const apiCall = async (
  url: string,
  data?: any,
  id?: string,
  deleteapi?: string
) => {
  let endpoint = endpoints[url];

  if (id && deleteapi) {
    endpoint = endpoint(id, deleteapi);
    const response = await axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  }

  if (id) {
    endpoint = endpoint(id);
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
      return response.data;
  }
  if (!data) {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } else {
    const response = await axios.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  }
};
