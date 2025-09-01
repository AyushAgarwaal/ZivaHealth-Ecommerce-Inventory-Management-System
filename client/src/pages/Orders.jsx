import { useEffect, useState } from "react";
import { fetchAllOrders, cancelOrder } from "../api/orders";
import toast from "react-hot-toast";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    fetchAllOrders().then(setOrders);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleCancel = async (id) => {
    try {
      await cancelOrder(id);
      toast.success("Order cancelled");
      loadOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cancel failed");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">All Orders</h1>
  
      {[...orders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((o) => (
          <div key={o._id} className="border p-2 mt-2 rounded">
            <p>Order ID: {o._id}</p>
            <p>User ID: {o.user_id}</p>
            <p>Status: {o.status}</p>
            <p>Total: ₹{o.total}</p>
            <p>Created: {new Date(o.createdAt).toLocaleDateString()}</p>
  
            {o.status === "placed" && (
              <button
                onClick={() => handleCancel(o._id)}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                Cancel Order
              </button>
            )}
          </div>
        ))}
    </div>
  );
};  