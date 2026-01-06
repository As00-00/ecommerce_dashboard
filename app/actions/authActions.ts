"use server";

import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const MASTER_EMAIL = process.env.ADMIN_EMAIL;
const MASTER_PASSWORD = process.env.ADMIN_PASSWORD;
const CREATION_TOKEN = process.env.ADMIN_CREATION_TOKEN;

// --- LOGIN ACTION ---
export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await connectDB();

  let isAuthenticated = false;

  // 1. Check Master Admin (.env)
  if (email === MASTER_EMAIL && password === MASTER_PASSWORD) {
    isAuthenticated = true;
  } 
  // 2. If not Master, check Database
  else {
    const adminUser = await Admin.findOne({ email });
    if (adminUser) {
      const isMatch = await bcrypt.compare(password, adminUser.password);
      if (isMatch) isAuthenticated = true;
    }
  }

  if (!isAuthenticated) {
    return { error: "Invalid email or password" };
  }

  // 3. Create Session
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);

  // 👇 FIX: Must await cookies() before setting
  (await cookies()).set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, 
    path: "/",
  });

  redirect("/");
}

// --- LOGOUT ACTION ---
export async function logout() {
  // 1. Force cookie expiration by setting Max-Age to 0
  (await cookies()).set("admin_token", "", { 
    expires: new Date(0), 
    path: "/", // Crucial: Must match the path used when setting the cookie
    maxAge: 0 
  });

  // 2. Redirect to login
  redirect("/login");
}

// ... keep imports ...

// 1. Define the Shape (Export this!)
export type ActionState = {
  error?: string;
  success?: boolean;
  message?: string;
};

// ... keep login and logout ...

// 2. Update createAdmin to use ActionState explicitly
export async function createAdmin(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const token = formData.get("secretToken") as string;
  const CREATION_TOKEN = process.env.ADMIN_CREATION_TOKEN;

  if (token !== CREATION_TOKEN) {
    return { error: "Invalid Secret Token! You are not authorized." };
  }

  await connectDB();

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return { error: "Admin with this email already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      email,
      password: hashedPassword,
    });

    return { success: true, message: "New Admin created successfully!" };
  } catch (error) {
    return { error: "Failed to create admin." };
  }
}