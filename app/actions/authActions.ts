"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// REMOVE the hardcoded strings.
// REPLACE them with process.env calls.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Safety Check: If someone forgot to set the .env variables, don't let anyone in.
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return { error: "Server misconfiguration: Credentials not set" };
  }

  // Compare input against the environment variables
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return { error: "Invalid email or password" };
  }

  // ... (The rest of the file stays exactly the same)
  const cookieStore = await cookies();
  cookieStore.set("admin_session", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  redirect("/");
}

// ... (Logout function stays the same)
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/login");
}