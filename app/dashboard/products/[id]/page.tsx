import connectDB from "@/lib/db";
import Product from "@/models/Product";
import EditProductForm from "@/components/EditProductForm";
import { redirect } from "next/navigation";

interface EditPageProps {
  params: Promise<{ id: string }>; // Update Type: It's a Promise now!
}

export default async function EditPage({ params }: EditPageProps) {
  // 1. UNWRAP THE PARAMS FIRST (The Fix)
  const { id } = await params;

  await connectDB();
  
  // 2. Now use the unwrapped 'id'
  const product = await Product.findById(id);

  if (!product) {
    redirect("/dashboard/products");
  }

  const plainProduct = {
    id: product._id.toString(),
    name: product.name,
    price: product.price,
    stock: product.stock,
    description: product.description || "",
    imageUrl: product.imageUrl || "",
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h2>
      <EditProductForm product={plainProduct} />
    </div>
  );
}