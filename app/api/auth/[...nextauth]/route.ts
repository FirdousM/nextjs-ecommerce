import NextAuth, { type AuthOptions, type Session, type User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "@/app/lib/memoryUsers";

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


// const users: MockDBUser[] = [
//     { id: "1", name: "Firdous", email: "firdous@example.com", password: "123456" }
// ];

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "test";

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

                if (!user) {
                    return null;
                }

                // const isValid = await compare(credentials.password, user.password_hash);
                const isValid = user.password === credentials.password;

                if (isValid) {
                    // Return user data. The password MUST NOT be returned.
                    return { id: user.id, name: user.name, email: user.email } as CustomUser;
                }

                return null; // Login failed
            }
        }),
    ],

    session: {
        strategy: "jwt"
    },

    pages: {
        signIn: "/login",
    },

    callbacks: {
        // 1. JWT Callback: Runs on login/token refresh. Moves data into the secure token.
        async jwt({ token, user }) {
            // 'user' is only present on initial successful sign-in (from authorize())
            if (user) {
                const customUser = user as CustomUser;
                token.id = customUser.id;
                token.email = customUser.email;
                token.name = customUser.name;
            }
            return token;
        },

        // 2. Session Callback: Runs on every session check. Moves data from token to frontend session object.
        async session({ session, token }: { session: Session; token: JWT }) {
            const customSession = session as CustomSession;
            const customToken = token as CustomJWT;
            if (customSession.user) {
                customSession.user.id = customToken.id;
                customSession.user.name = customToken.name;
                customSession.user.email = customToken.email;
            }
            return customSession;
        }
    },
};


// Export handlers for Next.js App Router API
export const GET = (req: Request) => NextAuth(authOptions)(req);
export const POST = (req: Request) => NextAuth(authOptions)(req);