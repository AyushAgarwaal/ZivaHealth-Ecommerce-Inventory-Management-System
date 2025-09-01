import http from "./http";

export const createOrder = async (payload) => {
  const res = await http.post("/orders", payload);
  return res.data;
};

export const fetchUserOrders = async (userId) => {
  const res = await http.get(`/orders/user/${userId}`);
  return res.data;
};

export const fetchAllOrders = async () => {
  const res = await http.get("/orders");
  return res.data;
};
