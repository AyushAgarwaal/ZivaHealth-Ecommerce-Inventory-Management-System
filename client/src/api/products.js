import http from "./http";

export const fetchProducts = async () => {
  const res = await http.get("/products");
  return res.data;
};

export const fetchLowStock = async () => {
  const res = await http.get("/products/low-stock");
  return res.data;
};
