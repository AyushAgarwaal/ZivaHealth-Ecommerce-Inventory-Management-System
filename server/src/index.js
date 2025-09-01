import dotenv from "dotenv";
dotenv.config();

// Import all models to register them with Mongoose
import "./models/Category.js";
import "./models/Product.js";
import "./models/Order.js";
import "./models/OrderItem.js";

import app from "./app.js";
import connectDB from "./db.js";

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
})();
