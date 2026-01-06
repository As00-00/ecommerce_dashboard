"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface InventoryChartProps {
  categoryData: ChartData[];
  brandData: ChartData[];
}

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#6366F1"];

export default function CategoryChart({ categoryData, brandData }: InventoryChartProps) {
  // State to toggle between "category" and "brand"
  const [activeTab, setActiveTab] = useState<"category" | "brand">("category");

  // Choose which data to show based on the active tab
  const data = activeTab === "category" ? categoryData : brandData;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[450px]">
      
      {/* HEADER WITH TOGGLES */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-bold text-gray-800">
          Inventory Distribution
        </h3>
        
        {/* THE TOGGLE BUTTONS */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("category")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
              activeTab === "category"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            By Category
          </button>
          <button
            onClick={() => setActiveTab("brand")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
              activeTab === "brand"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            By Brand
          </button>
        </div>
      </div>

      {/* THE CHART */}
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#6B7280", fontSize: 12 }} 
              dy={10}
              // Truncate long names so they don't overlap
              tickFormatter={(val) => val.length > 10 ? `${val.slice(0, 10)}...` : val}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#6B7280", fontSize: 12 }} 
            />
            <Tooltip 
              cursor={{ fill: "#F3F4F6" }}
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={1000}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}