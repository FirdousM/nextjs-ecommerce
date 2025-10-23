'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Loader } from "@/app/components";
import { signIn } from 'next-auth/react';
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        });
        if (res?.error) {
            setError("Invalid credentials");
            setIsLoading(false);
        } else {

            router.push("/products");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <label className="block mb-2 font-semibold">Email</label>
                <input
                    type="email"
                    className="w-full p-3 border rounded mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                />

                <label className="block mb-2 font-semibold">Password</label>
                <input
                    type="password"
                    className="w-full p-3 border rounded mb-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                />

                <Button
                    type="submit"
                    fullWidth
                    loading={isLoading}
                    loadingText="Signing In..."
                >
                    Login
                </Button>

                <p className="mt-4 text-center text-gray-600">
                    Don’t have an account? <a href="/signup" className="text-purple-600 hover:underline">Sign Up</a>
                </p>
            </form>
        </div>
    );
}
