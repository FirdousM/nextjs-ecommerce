import "./globals.css";
import { ReactNode } from "react";
import { Header, Footer } from "@/components";
import SessionProviderWrapper from "@/providers/SessionProviderWrapper";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import CartProviderWrapper from "./providers/CartProviderWrapper";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans bg-gray-50">
        <SessionProviderWrapper session={session}>
          <CartProviderWrapper>
            <Header />
            <main className="flex-1 container mx-auto p-6 bg-white shadow-md rounded-md mt-6">
              {children}
            </main>
            <Footer />
          </CartProviderWrapper>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}



