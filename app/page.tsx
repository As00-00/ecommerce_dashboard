export const dynamic = 'force-dynamic';
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import OverviewChart from "@/components/OverviewChart";
import { Package, DollarSign, CreditCard } from "lucide-react";

export default async function Home() {
  await connectDB();
  
  // 1. Fetch real data
  const products = await Product.find({});

  // 2. Calculate Stats
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, product) => acc + product.stock, 0);
  const totalValue = products.reduce((acc, product) => acc + (product.price * product.stock), 0);

  // 3. Prepare Data for Chart (Just show top 5 products by stock to avoid clutter)
  const chartData = products.slice(0, 5).map(product => ({
    name: product.name,
    stock: product.stock
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
      
      {/* STATS CARDS */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Card 1: Total Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold">{totalProducts}</h3>
            </div>
          </div>
        </div>

        {/* Card 2: Total Value */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Inventory Value</p>
              <h3 className="text-2xl font-bold">${totalValue.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        {/* Card 3: Total Stock */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Items in Stock</p>
              <h3 className="text-2xl font-bold">{totalStock}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Stock Overview</h2>
        {products.length > 0 ? (
          <OverviewChart data={chartData} />
        ) : (
          <p className="text-gray-500">Add products to see analytics.</p>
        )}
      </div>
    </div>
  );
}