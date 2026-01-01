"use client";

import { updateProduct } from "@/app/actions/productActions"; // We will make this soon
import ImageUpload from "@/components/ImageUpload";
import { useState } from "react";
import Link from "next/link";

interface EditProductFormProps {
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
  };
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const [imageUrl, setImageUrl] = useState(product.imageUrl);

  return (
    <form action={updateProduct} className="space-y-4">
      
      {/* We need the ID to know which product to update! */}
      <input type="hidden" name="id" value={product.id} />
      
      {/* IMAGE UPLOAD */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
        <ImageUpload 
          value={imageUrl} 
          onUpload={(url) => setImageUrl(url)} 
        />
        <input type="hidden" name="imageUrl" value={imageUrl} />
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <input 
          type="text" 
          name="name" 
          defaultValue={product.name}
          className="w-full border border-gray-300 rounded-lg p-2" 
          required 
        />
      </div>

      {/* Price & Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
          <input 
            type="number" 
            name="price" 
            step="0.01"
            defaultValue={product.price}
            className="w-full border border-gray-300 rounded-lg p-2" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
          <input 
            type="number" 
            name="stock" 
            defaultValue={product.stock}
            className="w-full border border-gray-300 rounded-lg p-2" 
            required 
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea 
          name="description" 
          rows={4} 
          defaultValue={product.description}
          className="w-full border border-gray-300 rounded-lg p-2" 
        />
      </div>

      <div className="flex gap-4">
        <Link 
            href="/dashboard/products"
            className="w-full text-center bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition"
        >
            Cancel
        </Link>
        <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition">
          Update Product
        </button>
      </div>
    </form>
  );
}