import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { dispatch } = useCart();

  const [hover, setHover] = useState(false);

  const lowStock = product.stock_quantity < 10;

  return (
    <div className="relative border p-4 rounded shadow">
      {/* Low stock indicator */}
      {lowStock && (
        <div
          className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full cursor-pointer"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {hover && (
            <span className="absolute top-[-30px] right-0 bg-black text-white text-xs px-2 py-1 rounded">
              Low quantity
            </span>
          )}
        </div>
      )}
      <h2 className="font-bold">{product.name}</h2>
      <p>₹{product.price}</p>
      <p>Stock: {product.stock_quantity}</p>
      <button
        onClick={() => {
          dispatch({ type: "ADD", item: { product, quantity: 1 } });
          toast.success(`${product.name} added to cart`);
        }}
        className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
