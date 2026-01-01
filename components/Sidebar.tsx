"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Settings, LogOut } from "lucide-react";
import { logout } from "@/app/actions/authActions";

// This is just a list of our links. Easy to add more later.
const navLinks = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-gray-900 text-white">
      {/* Logo Area */}
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold text-emerald-400">AdminPanel</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2 p-4">
        {navLinks.map((link) => {
          const Icon = link.icon;
          // Check if this link is currently active
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                isActive
                  ? "bg-emerald-600 text-white" // Active Style
                  : "text-gray-400 hover:bg-gray-800 hover:text-white" // Inactive Style
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Area (Bottom) */}
      {/* Logout Area */}
      <div className="border-t border-gray-800 p-4">
        <form action={logout}>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </form>
      </div>
    </div>
  );
}
