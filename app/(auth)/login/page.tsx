"use client";

import { login } from "@/app/actions/authActions";
import { useActionState } from "react";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [state, action] = useActionState(login, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-emerald-100 rounded-full mb-3">
            <ShieldCheck />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-500">
            Enter your credentials to access the panel
          </p>
        </div>

        <form action={action} className="space-y-4">
          <div>
            <label className="block text-xl font-small text-gray-800 mb-2">
              Email Address<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter the Email"
              className="w-full border text-black border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xl font-small text-gray-700 mb-2">
              Password<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 text-black rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          {state?.error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center">
              {state.error}
            </div>
          )}

        

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition hover cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
