import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./db.js";
import { Server } from "socket.io";
import http from "http";

// Import all models to register them with Mongoose
import "./models/Category.js";
import "./models/Product.js";
import "./models/Order.js";
import "./models/OrderItem.js";



const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await connectDB();

    const server = http.createServer(app);


    const io = new Server(server, {
      cors: {
        origin: "*", 
      },
    });

    // store io globally for controllers
    app.set("io", io);

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
})();
