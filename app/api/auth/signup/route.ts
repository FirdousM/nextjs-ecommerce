import { NextResponse } from "next/server";
import { users } from "@/lib/memoryUsers";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  // Prevent duplicate email
  if (users.find(u => u.email === email)) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    password
  };

  users.push(newUser); // ✅ Add user to shared mock DB

  return NextResponse.json({ message: "Account created successfully" });
}
