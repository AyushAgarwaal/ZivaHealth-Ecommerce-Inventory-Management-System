import { io } from "socket.io-client";

// replace with your Render backend URL
const SOCKET_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:4000";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});
