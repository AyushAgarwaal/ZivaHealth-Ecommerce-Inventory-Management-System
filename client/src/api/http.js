import axios from "axios";

const http = axios.create({
  baseURL: "https://zivahealth-ecommerce-inventory.onrender.com/api/", 
});

export default http;
