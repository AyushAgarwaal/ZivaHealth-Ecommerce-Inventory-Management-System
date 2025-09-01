import dotenv from "dotenv";
dotenv.config();
// import mongoose from "mongoose";
import connectDB from "../src/db.js";
import Category from "../src/models/Category.js";
import Product from "../src/models/Product.js";

const seed = async () => {
  try {
    await connectDB();

    // clear old data
    await Category.deleteMany();
    await Product.deleteMany();

    // categories
    const categories = await Category.insertMany([
      { name: "Electronics", description: "Gadgets and devices" },
      { name: "Books", description: "Fiction, non-fiction, and academic" },
      { name: "Clothing", description: "Men's and women's apparel" },
    ]);

    // products
    const products = [
      {
        name: "Smartphone",
        sku: "ELEC001",
        price: 599.99,
        stock_quantity: 15,
        category: categories[0]._id,
      },
      {
        name: "Laptop",
        sku: "ELEC002",
        price: 999.99,
        stock_quantity: 8,
        category: categories[0]._id,
      },
      {
        name: "Novel - The Great Gatsby",
        sku: "BOOK001",
        price: 12.99,
        stock_quantity: 50,
        category: categories[1]._id,
      },
      {
        name: "T-Shirt",
        sku: "CLOT001",
        price: 19.99,
        stock_quantity: 100,
        category: categories[2]._id,
      },
      {
        name: "Jeans",
        sku: "CLOT002",
        price: 49.99,
        stock_quantity: 25,
        category: categories[2]._id,
      },
    ];

    await Product.insertMany(products);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();
