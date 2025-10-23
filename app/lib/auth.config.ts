import { type AuthOptions, type Session, type User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "@/app/lib/memoryUsers"; // Assuming this path is correct

// --- Custom Types (Keep these) ---
interface CustomUser extends User {
    id: string;
    name: string;
    email: string;
}

interface CustomJWT extends JWT {
    id: string;
    name: string;
    email: string;
}

interface CustomSession extends Session {
    user: CustomUser;
}

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "test";

// --- Auth Options (Export this only) ---
export const authOptions: AuthOptions = {
    secret: NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const user = users.find(u => u.email === credentials.email);
                if (!user || user.password !== credentials.password) return null;
                
                // Ensure the returned object matches CustomUser structure
                return { id: user.id, name: user.name, email: user.email } as CustomUser;
            },
        }),
    ],
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const customUser = user as CustomUser;
                token.id = customUser.id;
                token.name = customUser.name;
                token.email = customUser.email;
            }
            return token;
        },
        async session({ session, token }) {
            const customSession = session as CustomSession;
            const customToken = token as CustomJWT;
            if (customSession.user) {
                customSession.user.id = customToken.id;
                customSession.user.name = customToken.name;
                customSession.user.email = customToken.email;
            }
            return customSession;
        },
    },
};