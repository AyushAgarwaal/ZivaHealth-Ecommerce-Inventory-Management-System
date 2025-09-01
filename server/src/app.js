import express from "express";
import morgan from "morgan";
import cors from "cors";
import productsRouter from "./routes/products.routes.js";
import ordersRouter from "./routes/orders.routes.js";
import errorHandler from "./middleware/error.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

// health check
app.get("/api/health", (req, res) => {
  res.json({ status: "okayy" });
});

// error handling
app.use(errorHandler);

export default app;
