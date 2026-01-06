"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  ImageIcon,
  Pencil,
  Search,
  ChevronDown,
  Filter,
} from "lucide-react";
import { deleteProduct } from "@/app/actions/productActions";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
  description: string;
  imageUrl: string;
  isFeatured:string;
}

export default function ProductTable({ products }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");

  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))).filter(
      (c) => c !== "All"
    ),
  ];

  const getBrandsForCategory = (cat: string) => {
    let filtered = products;
    if (cat !== "All") {
      filtered = products.filter((p) => p.category === cat);
    }
    const brands = Array.from(
      new Set(filtered.map((p) => p.brand).filter(Boolean))
    );
    return brands as string[];
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesBrand =
      selectedBrand === "All" || product.brand === selectedBrand;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  const toggleReadMore = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <Link
            href="/dashboard/products/new"
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition shrink-0"
          >
            <Plus className="h-5 w-5" />
            <span className="hidden sm:inline">Add Product</span>
          </Link>
        </div>
      </div>

      <div className="flex gap-6 border-b mb-6 relative">
        {categories.map((cat,idx) => (
          <div
            key={`${cat}-${idx}`}            className="relative pb-3"
            onMouseEnter={() => setHoveredCategory(cat)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <button
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedBrand("All");
              }}
              className={`font-medium transition-colors flex items-center gap-1 ${
                selectedCategory === cat
                  ? "text-emerald-600 border-b-2 border-emerald-600 hover:cursor-pointer"
                  : "text-gray-500 hover:text-gray-800 hover:cursor-pointer"
              }`}
            >
              {cat}
              {hoveredCategory === cat &&
                getBrandsForCategory(cat).length > 0 && (
                  <ChevronDown className="h-3 w-3" />
                )}
            </button>

            {hoveredCategory === cat &&
              getBrandsForCategory(cat).length > 0 && (
                <div className="absolute top-full left-0 mt-0 w-48 bg-white border rounded-lg shadow-lg z-10 p-2">
                  <p className="text-xs text-blue-400 font-bold px-2 py-1 uppercase">
                    Filter by Brand
                  </p>
                  {getBrandsForCategory(cat).map((brand,idx) => (
                    <button
                      key={`${cat}-${brand}-${idx}`}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedBrand(brand);
                        setHoveredCategory(null);
                      }}
                      className="block w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <Filter className="h-10 w-10 mx-auto mb-2 opacity-20" />
            <p>No products match your filters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedBrand("All");
              }}
              className="text-emerald-600 text-sm mt-2 hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const isExpanded = expandedIds.includes(product._id);
            const words = (product.description || "").split(" ");
            const isLong = words.length > 5;
            const displayDesc =
              isExpanded || !isLong
                ? product.description
                : words.slice(0, 5).join(" ") + "...";

            return (
              <div
                key={product._id}
                className={`flex flex-col md:flex-row gap-4 border p-4 rounded-lg bg-white shadow-sm transition-all relative ${
                  isExpanded ? "ring-1 ring-emerald-100" : ""
                } ${
                  // Optional: Add a subtle gold border/glow for featured items
                  product.isFeatured ? "border-amber-200 bg-amber-50/30" : ""
                }`}
              >
                {/* FEATURED BADGE (Optional corner ribbon) */}
                {product.isFeatured && (
                  <div className="absolute top-0 right-0 bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-lg z-10 shadow-sm">
                    FEATURED
                  </div>
                )}

                <div className="flex items-start gap-4 flex-1">
                  {/* Image Section */}
                  <div className="relative rounded-md border border-gray-200 bg-gray-50 overflow-hidden shrink-0 w-16 h-16">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-400">
                        <ImageIcon className="h-6 w-6" />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-lg text-gray-800">
                        {product.name}
                      </h2>
                      {/* STAR ICON for Featured Products */}
                      {product.isFeatured && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-amber-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-xs uppercase font-bold tracking-wide">
                        {product.category}
                      </span>
                      {product.brand && (
                        <span className="text-emerald-600 font-medium text-xs">
                          {product.brand}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${product.price}{" "}
                      <span className="text-gray-300 mx-2">|</span> Stock:{" "}
                      {product.stock}
                    </p>
                  </div>
                </div>

                {/* ... (Description and Action Buttons remain the same) ... */}
                <div className="flex-1 text-sm text-gray-600 min-w-[200px]">
                  <p>
                    {displayDesc}
                    {isLong && (
                      <button
                        onClick={() => toggleReadMore(product._id)}
                        className="text-emerald-600 hover:underline ml-1 font-medium text-xs cursor-pointer"
                      >
                        {isExpanded ? "(Show Less)" : "Read More"}
                      </button>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center">
                  {/* Edit Link */}
                  <div className="group relative flex flex-col items-center">
                    <Link
                      href={`/dashboard/products/${product._id}`}
                      className="text-blue-500 hover:bg-blue-50 p-2 rounded transition"
                    >
                      <Pencil className="h-5 w-5" />
                    </Link>
                    <span className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded pointer-events-none">
                      Edit
                    </span>
                  </div>

                  {/* Delete Form */}
                  <form
                    action={deleteProduct}
                    className="group relative flex flex-col items-center"
                  >
                    <input type="hidden" name="id" value={product._id} />
                    <button
                      type="submit"
                      className="text-red-500 hover:bg-red-50 p-2 rounded transition cursor-pointer"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <span className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 text-white text-[10px] px-2 py-0.5 rounded pointer-events-none">
                      Delete
                    </span>
                  </form>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
