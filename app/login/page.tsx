"use client";

import { login } from "@/app/actions/authActions"; // We will create this next
import { useFormState } from "react-dom";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  // useFormState allows us to see errors sent back from the server
  // The first argument is the server action, the second is the initial state
  const [state, action] = useFormState(login, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-emerald-100 rounded-full mb-3">
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-500">Enter your credentials to access the panel</p>
        </div>

        <form action={action} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          {/* Error Message Area */}
          {state?.error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}