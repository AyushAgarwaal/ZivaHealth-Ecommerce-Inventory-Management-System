import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  getLowStockProducts,
  adjustStock,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.get("/low-stock", getLowStockProducts);
router.put("/:id/stock", adjustStock);

export default router;
