import mongoose from "mongoose";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import { calculateTotals } from "../utils/totals.js";

export const createOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user_id = "Ayush123";
    const { items } = req.body;
    if (!user_id || !items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    let subtotal = 0;
    const orderItems = [];
    const io = req.app.get("io");

    for (const { productId, quantity } of items) {
      const product = await Product.findOneAndUpdate(
        { _id: productId, stock_quantity: { $gte: quantity } },
        { $inc: { stock_quantity: -quantity } },
        { new: true, session }
      );
      if (!product) {
        throw new Error("INSUFFICIENT_STOCK");
      }
      io.emit("stock-updated", {
        productId: product._id,
        newStock: product.stock_quantity,
      });
      orderItems.push({
        product: product._id,
        quantity,
        price_at_time: product.price,
      });
      subtotal += product.price * quantity;
    }

    //// const total = subtotal;
    const { total } = calculateTotals(subtotal);

    const order = await Order.create(
      [{ user_id, total, status: "placed" }],
      { session }
    ); 

    await OrderItem.insertMany(
      orderItems.map((oi) => ({ ...oi, order: order[0]._id })),
      { session }
    );

    await session.commitTransaction();
    res.status(201).json(order[0]);
  } catch (err) {
    await session.abortTransaction();
    if (err.message === "INSUFFICIENT_STOCK") {
      return res.status(409).json({ message: "Insufficient stock" });
    }
    next(err);
  } finally {
    session.endSession();
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const items = await OrderItem.find({ order: order._id }).populate("product");
    res.json({ order, items });
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const io = req.app.get("io"); 
    const order = await Order.findById(req.params.id).session(session);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const { status } = req.body;

    if (status === "cancelled" && order.status === "placed") {
      const items = await OrderItem.find({ order: order._id }).session(session);
      for (const it of items) {
        const product = await Product.findByIdAndUpdate(
          it.product,
          { $inc: { stock_quantity: it.quantity } },
          { new: true, session }
        );

        // emit stock update on cancel
        if (product) {
          io.emit("stock-updated", {
            productId: product._id,
            newStock: product.stock_quantity,
          });
        }
      }
    }

    order.status = status;
    await order.save({ session });

    await session.commitTransaction();
    res.json(order);
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user_id: req.params.userId });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const fulfillOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "fulfilled";
    await order.save();
    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};
