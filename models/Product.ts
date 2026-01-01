import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      default: 0,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    imageUrl: {
      type: String, // We will just store the URL string from Cloudinary
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// This check is important!
// In Next.js, this file might run multiple times.
// We check: "Does the model already exist?" If yes, use it. If no, create it.
const Product = models.Product || model("Product", ProductSchema);

export default Product;