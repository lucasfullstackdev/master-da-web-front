import { api } from "../services/api";

const listAll = async () => {
  const response = await api.get("/products");

  return response.data.data;
};

export const productService = {
  listAll,
};
