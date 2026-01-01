"use client"; // We must switch to Client Component to use state for the image URL

import { addProduct } from "@/app/actions/productActions";
import ImageUpload from "@/components/ImageUpload";
import { useState } from "react";

export default function AddProductPage() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      
      <form action={addProduct} className="space-y-4">
        
        {/* IMAGE UPLOAD SECTION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
          <ImageUpload 
            value={imageUrl} 
            onUpload={(url) => setImageUrl(url)} 
          />
          {/* THE SECRET SAUCE: A hidden input that carries the URL to the server */}
          <input type="hidden" name="imageUrl" value={imageUrl} />
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input type="text" name="name" className="w-full border border-gray-300 rounded-lg p-2" required />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input type="number" name="price" step="0.01" className="w-full border border-gray-300 rounded-lg p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input type="number" name="stock" className="w-full border border-gray-300 rounded-lg p-2" required />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" rows={4} className="w-full border border-gray-300 rounded-lg p-2" />
        </div>

        <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition">
          Create Product
        </button>
      </form>
    </div>
  );
}