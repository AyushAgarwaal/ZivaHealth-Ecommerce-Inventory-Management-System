import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import { socket } from "../api/socket";

export default function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);

    // listen for stock updates
    socket.on("stock-updated", ({ productId, newStock }) => {
      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, stock_quantity: newStock } : p
        )
      );
    });

    return () => {
      socket.off("stock-updated");
    };
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
