import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Link from "next/link";
import CategoryChart from "@/components/OverviewChart";
import { Package, DollarSign, TrendingUp, AlertTriangle, ArrowRight, Clock } from "lucide-react";


const StatCard = ({ title, value, subtext, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
    </div>
    <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
      <Icon className={`w-6 h-6 ${color.replace("bg-", "text-")}`} />
    </div>
  </div>
);

export default async function DashboardPage() {
  await connectDB();

  
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();


  const totalProducts = products.length;
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const lowStockItems = products.filter((p) => p.stock < 10); 
  const featuredCount = products.filter((p) => (p as any).isFeatured).length;
  

  const recentProducts = products.slice(0, 5);
  const categoryCounts: { [key: string]: number } = {};
  
  products.forEach((p: any) => {
    const cat = p.category || "Uncategorized";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  // ... inside DashboardPage function ...

  // --- CHART DATA PREP ---
  const brandCounts: { [key: string]: number } = {}; // <--- New Object
  
  products.forEach((p: any) => {
    // Count Categories
    const cat = p.category || "Uncategorized";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;

    // Count Brands
    const brand = p.brand || "No Brand";
    brandCounts[brand] = (brandCounts[brand] || 0) + 1;
  });

  // Convert to Arrays
  const categoryData = Object.keys(categoryCounts).map(key => ({
    name: key,
    value: categoryCounts[key]
  }));

  const brandData = Object.keys(brandCounts).map(key => ({
    name: key,
    value: brandCounts[key]
  }));
  // -----------------------
  return (
    <div className="p-8 max-w-7xl mx-auto">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your inventory performance</p>
      </div>

      {/* TOP STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Inventory" 
          value={totalProducts} 
          subtext="Items in stock"
          icon={Package} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Total Value" 
          value={`$${totalValue.toLocaleString()}`} 
          subtext="Revenue potential"
          icon={DollarSign} 
          color="bg-emerald-500" 
        />
        <StatCard 
          title="Low Stock Alerts" 
          value={lowStockItems.length} 
          subtext={lowStockItems.length > 0 ? "Requires attention" : "All good"}
          icon={AlertTriangle} 
          color={lowStockItems.length > 0 ? "bg-red-500" : "bg-gray-400"} 
        />
        <StatCard 
          title="Active Campaigns" 
          value={featuredCount} 
          subtext="Featured products"
          icon={TrendingUp} 
          color="bg-amber-500" 
        />
      </div>
      {/* CHARTS ROW */}
       <div className="mb-8">
          <CategoryChart categoryData={categoryData} brandData={brandData} />
       </div>

      {/* SPLIT SECTION: Recent Items (Left) & Alerts (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: RECENT PRODUCTS */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              Recently Added
            </h3>
            <Link href="/dashboard/products" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Product Name</th>
                  <th className="px-6 py-3 font-medium">Price</th>
                  <th className="px-6 py-3 font-medium">Stock</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentProducts.map((product: any) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">{product.name}</td>
                    <td className="px-6 py-4 text-gray-600">${product.price}</td>
                    <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.stock > 10 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {product.stock > 10 ? "In Stock" : "Low Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: ALERTS & ACTIONS */}
        <div className="flex flex-col gap-6">
          
          {/* Low Stock Widget */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Needs Attention
            </h3>
            {lowStockItems.length === 0 ? (
              <p className="text-gray-500 text-sm">Everything is well stocked!</p>
            ) : (
              <div className="space-y-3">
                {lowStockItems.slice(0, 3).map((item: any) => (
                  <div key={item._id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                    <div>
                      <p className="font-medium text-red-900 text-sm">{item.name}</p>
                      <p className="text-red-700 text-xs">Only {item.stock} left</p>
                    </div>
                    <Link href={`/dashboard/products/${item._id}`} className="text-xs bg-white text-red-600 px-2 py-1 rounded border border-red-200 hover:bg-red-50">
                      Restock
                    </Link>
                  </div>
                ))}
                {lowStockItems.length > 3 && (
                  <p className="text-xs text-center text-gray-400 mt-2">
                    + {lowStockItems.length - 3} more items
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions Widget */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-xl shadow-md text-white">
            <h3 className="font-bold text-lg mb-2">Quick Actions</h3>
            <p className="text-emerald-100 text-sm mb-4">Manage your store efficiently.</p>
            <Link 
              href="/dashboard/products/new"
              className="block w-full text-center bg-white text-emerald-700 font-bold py-2 rounded-lg hover:bg-emerald-50 transition shadow-sm"
            >
              + Add New Product
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}