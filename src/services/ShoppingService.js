import { api } from "../services/api";

const registerOrder = async (order) => {
  const response = await api.post("/shopping", order);
  
  return response.data;
};

export const shoppingService = {
  registerOrder,
};
