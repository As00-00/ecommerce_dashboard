"use client";

import { updateProduct } from "@/app/actions/productActions"; 
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
    brand: string;
    category: string;
    isFeatured: boolean;
  };
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const [imageUrl, setImageUrl] = useState(product.imageUrl);

  return (
    <form action={updateProduct} className="space-y-4">
      

      <input type="hidden" name="id" value={product.id} />
      

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
        <ImageUpload 
          value={imageUrl} 
          onUpload={(url) => setImageUrl(url)} 
        />
        <input type="hidden" name="imageUrl" value={imageUrl} />
      </div>

    
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

      
      <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              required
              defaultValue={product.category}
              className="w-full border border-gray-300 rounded-lg p-2 bg-white"
            >
              <option value="" disabled>Select...</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Phone">Phone</option>
              <option value="Computer">Computer</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
              <option value="Books">Books</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <input 
              type="text" 
              name="brand" 
              defaultValue={product.brand}
              placeholder="e.g. Nike" 
              className="w-full border border-gray-300 rounded-lg p-2" 
              required
            />
          </div>
      </div>


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

      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea 
          name="description" 
          rows={4} 
          defaultValue={product.description}
          className="w-full border border-gray-300 rounded-lg p-2" 
        />
      </div>

    
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
          <input 
              type="checkbox" 
              name="isFeatured" 
              id="isFeatured" 
              defaultChecked={product.isFeatured} 
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="isFeatured" className="text-gray-700 font-medium cursor-pointer">
              Mark as Featured Product?
          </label>
      </div>


      <div className="flex gap-4">
        <Link 
            href="/dashboard/products"
            className="w-full text-center bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition cursor-pointer"
        >
            Cancel
        </Link>
        <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition cursor-pointer">
          Update Product
        </button>
      </div>
    </form>
  );
}