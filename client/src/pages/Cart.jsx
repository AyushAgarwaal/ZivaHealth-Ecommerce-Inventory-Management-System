import { useCart } from "../context/CartContext";
import { createOrder } from "../api/orders";
import toast from "react-hot-toast";

export default function Cart() {
  const { cart, dispatch } = useCart();

  const subtotal = cart.reduce(
    (sum, c) => sum + c.product.price * c.quantity,
    0
  );

  const checkout = async () => {
    if (cart.length === 0) {
      toast.error("Add at least 1 product before checkout");
      return;
    }
    try {
      const payload = {
        user_id: "Ayush123", 
        items: cart.map((c) => ({
          productId: c.product._id,
          quantity: c.quantity,
        })),
      };
      const order = await createOrder(payload);
      toast.success("Order placed! ID: " + order._id);
      dispatch({ type: "CLEAR" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Cart</h1>
      {cart.map((c, i) => (
        <div key={i} className="flex justify-between border-b py-2">
          <span>{c.product.name}</span>
          <span>₹{c.product.price}</span>
          <button
            onClick={() => dispatch({ type: "REMOVE", index: i })}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <p className="mt-4">Subtotal: ₹{subtotal.toFixed(2)}</p>
      <button
        onClick={checkout}
        className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
      >
        Checkout
      </button>
    </div>
  );
}
