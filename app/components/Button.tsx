'use client';

import React from "react";


interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    children: React.ReactNode;
    variant?: "primary" | "danger" | "success" | "gradient";
    fullWidth?: boolean;
    className?: string;
    type?: "button" | "submit";
    loadingText?: string;
}

export default function Button({
    onClick,
    disabled,
    loading,
    children,
    variant = "primary",
    fullWidth = false,
    className = '',
    type = "button",
    loadingText,
}: ButtonProps) {
    const baseStyles =
        "py-3 px-4 rounded-lg font-semibold shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-purple-600 text-white hover:bg-purple-700 active:scale-95",
        danger: "bg-red-500 text-white hover:bg-red-600 active:scale-95",
        success: "bg-green-500 text-white hover:bg-green-600 active:scale-95",
        gradient:
            "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 active:scale-95",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            type={type}
            className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
        >
            {loading ? (
                <div className="text-center">
                    {loadingText || "Processing..."}
                </div>
            ) : (
                children
            )}
        </button>
    );
}
