"use client";

import { addProduct } from "@/app/actions/productActions";
import ImageUpload from "@/components/ImageUpload";
import { useState } from "react";

export default function AddProductPage() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>

      <form action={addProduct} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Image
          </label>
          <ImageUpload value={imageUrl} onUpload={(url) => setImageUrl(url)} />

          <input type="hidden" name="imageUrl" value={imageUrl} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              required
              defaultValue=""
              className="w-full border border-gray-300 rounded-lg p-2 bg-white"
            >
              <option value="" disabled>
                Select...
              </option>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              placeholder="e.g. Nike"
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Visibility</label>
          <select
            name="isFeatured"
            className="p-3 border rounded-lg bg-white"
            defaultValue="false" 
          >
            <option value="false">Standard Product</option>
            <option value="true">★ Featured Product</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition cursor-pointer"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
