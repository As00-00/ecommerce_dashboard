"use client";

import { createAdmin } from "@/app/actions/authActions";
import { useActionState } from "react"; // Updated hook for Next.js 14/15
import { UserPlus, Lock, Key } from "lucide-react";

const initialState = {
  error: "",
  success: false,
  message: ""
};

export default function OnboardAdminPage() {
  const [state, action] = useActionState(createAdmin, initialState);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow mt-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 rounded-full">
          <UserPlus className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Onboard New Admin</h2>
          <p className="text-gray-500 text-sm">Create a new administrator account</p>
        </div>
      </div>

      <form action={action} className="space-y-4">
        
        {/* New Admin Credentials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="new.admin@company.com"
              required 
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Set a strong password"
              required 
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none" 
            />
          </div>
        </div>

        <hr className="my-6 border-gray-100" />

        {/* Security Check */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Key className="w-4 h-4 text-gray-500" />
            Master Secret Token
          </label>
          <input 
            type="password" 
            name="secretToken" 
            placeholder="Enter the secret token from .env"
            required 
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-500 outline-none" 
          />
          <p className="text-xs text-gray-500 mt-2">
            * This token is required to verify you have permission to add admins.
          </p>
        </div>

        {/* Messages */}
        {state?.error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
            <Lock className="w-4 h-4" /> {state.error}
          </div>
        )}
        
        {state?.success && (
           <div className="p-3 bg-emerald-50 text-emerald-600 text-sm rounded-lg border border-emerald-100">
             {state.message}
           </div>
        )}

        <button 
          type="submit" 
          className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition cursor-pointer"
        >
          Create New Admin
        </button>
      </form>
    </div>
  );
}