'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        setIsLoading(false);

        if (res.ok) {
            setSuccess(data.message);
            setTimeout(() => router.push("/login"), 1500);
        } else {
            setError(data.error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xl font-bold">
                        DP
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

                {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <Button
                    type="submit"
                    fullWidth
                    variant="gradient"
                    loading={isLoading}
                    loadingText="Creating Account..."
                    className="mt-6"
                >
                    Sign Up
                </Button>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <a href="/login" className="text-purple-600 hover:underline">Login</a>
                </p>
            </form>
        </div>
    );
}
