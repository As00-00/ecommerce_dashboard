export const dynamic = 'force-dynamic';
import Link from "next/link";
import { Plus, Trash2, ImageIcon, Pencil } from "lucide-react"; // Added ImageIcon for fallback
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { deleteProduct } from "@/app/actions/productActions";

export default async function ProductsPage() {
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <Link
          href="/dashboard/products/new"
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </Link>
      </div>

      <div className="grid gap-4">
        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No products found.</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between border p-4 rounded-lg bg-white shadow-sm"
            >
              {/* Left Side: Image + Text */}
              <div className="flex items-center gap-4">
                {/* IMAGE CONTAINER - STRICT SIZING WITH INLINE STYLES */}
                <div
                  className="relative rounded-md border border-gray-200 bg-gray-50 overflow-hidden shrink-0"
                  style={{ width: "64px", height: "64px", minWidth: "64px" }} // Force fixed width
                >
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // Zooms in to fill the square
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                  )}
                </div>

                {/* Text Info */}
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    ${product.price}{" "}
                    <span className="text-gray-300 mx-2">|</span> Stock:{" "}
                    {product.stock}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Edit Button */}
                <Link
                  href={`/dashboard/products/${product._id}`}
                  className="text-blue-500 hover:bg-blue-50 p-2 rounded transition"
                >
                  {/* You might need to import Pencil from lucide-react first! */}
                  <Pencil className="h-5 w-5" />
                </Link>

                {/* Delete Button (Keep this as it was) */}
                <form action={deleteProduct}>
                  {/* ... existing delete code ... */}
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
