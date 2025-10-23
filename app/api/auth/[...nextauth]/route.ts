

// const users: MockDBUser[] = [
//     { id: "1", name: "Firdous", email: "firdous@example.com", password: "123456" }
// ];

import NextAuth from "next-auth";
// 🎯 FIX: Import the options from the new config file
import { authOptions } from "@/app/lib/auth.config";

// --- App Router Handlers ---
// The handler receives the authOptions and is executed by NextAuth.
const handler = NextAuth(authOptions);

// 🎯 FIX: Only the NextAuth handler is exported under the required method names.
export { handler as GET, handler as POST };