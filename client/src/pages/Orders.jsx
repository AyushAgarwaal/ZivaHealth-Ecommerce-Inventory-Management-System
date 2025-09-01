import { useEffect, useState } from "react";
import { fetchAllOrders } from "../api/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAllOrders().then(setOrders);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">All Orders</h1>
      {orders.map((o) => (
        <div key={o._id} className="border p-2 mt-2 rounded">
          <p>Order ID: {o._id}</p>
          <p>User ID: {o.user_id}</p>
          <p>Status: {o.status}</p>
          <p>Total: ₹{o.total}</p>
          <p>Created: {new Date(o.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
