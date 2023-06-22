import { api } from "../services/api";

const exists = async () => {
  const response = await api.get("/products");

  return response.data.data;
};

const signUp = async (data) => {
  const response = await api.post('/clients', data);

  return response.data;
};

export const clientService = {
  exists,
  signUp
};
