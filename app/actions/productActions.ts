"use server";

import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function addProduct(formData: FormData) {
  await connectDB();

  const name = formData.get("name");
  const price = formData.get("price");
  const stock = formData.get("stock");
  const description = formData.get("description");
  const imageUrl = formData.get("imageUrl");
  const brand = formData.get("brand");
  const category = formData.get("category");


  const isFeatured = formData.get("isFeatured") === "true";

  try {
    await Product.create({
      name,
      price: Number(price),
      stock: Number(stock),
      description,
      imageUrl,
      brand,
      category,
      isFeatured, 
    });
  } catch (error) {
    console.error("Creation failed:", error);
    throw new Error("Failed to create product");
  }

  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard"); 
  redirect("/dashboard/products");
}


export async function updateProduct(formData: FormData) {
  await connectDB();

  const id = formData.get("id");
  const name = formData.get("name");
  const price = formData.get("price");
  const stock = formData.get("stock");
  const description = formData.get("description");
  const imageUrl = formData.get("imageUrl");
  const brand = formData.get("brand");
  const category = formData.get("category");
  

  const isFeatured = formData.get("isFeatured") === "on";

  if (!id) throw new Error("Product ID is missing");

  try {
    await Product.findByIdAndUpdate(id, {
      name,
      price: Number(price),
      stock: Number(stock),
      description,
      imageUrl,
      brand,
      category,
      isFeatured,
    });
  } catch (error) {
    console.error("Update failed:", error);
    throw new Error("Failed to update product");
  }

  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard");
  redirect("/dashboard/products");
}


export async function deleteProduct(formData: FormData) {
  const id = formData.get("id");
  await connectDB();
  
  try {
    await Product.findByIdAndDelete(id);
    revalidatePath("/dashboard/products");
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Delete failed:", error);
  }
}