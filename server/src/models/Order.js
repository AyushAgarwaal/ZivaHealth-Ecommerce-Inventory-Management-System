import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "placed", "fulfilled", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
