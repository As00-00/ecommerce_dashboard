"use server"; // <--- Crucial! This marks the function as backend code.

import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {
  // 1. Connect to DB
  await connectDB();

  // 2. Extract data from the form
  const name = formData.get("name");
  const price = formData.get("price");
  const stock = formData.get("stock");
  const description = formData.get("description");
  const imageUrl = formData.get("imageUrl");

  // 3. Save to MongoDB
  try {
    await Product.create({
      name,
      price: Number(price),
      stock: Number(stock),
      description,
      imageUrl
    });
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }

  // 4. Refresh the data and redirect
  // "revalidatePath" tells Next.js: "The product list has changed, please refresh that page."
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get("id");
  
  if (!id) return;

  await connectDB();
  await Product.findByIdAndDelete(id);

  // Refresh the list so the deleted item disappears immediately
  revalidatePath("/dashboard/products");
}

export async function updateProduct(formData: FormData) {
  await connectDB();

  const id = formData.get("id");
  const name = formData.get("name");
  const price = formData.get("price");
  const stock = formData.get("stock");
  const description = formData.get("description");
  const imageUrl = formData.get("imageUrl");

  if (!id) throw new Error("Product ID is missing");

  await Product.findByIdAndUpdate(id, {
    name,
    price: Number(price),
    stock: Number(stock),
    description,
    imageUrl,
  });

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}