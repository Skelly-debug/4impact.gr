"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Authentication Error
        </h2>
        <p className="text-red-500 text-center">
          {error === "CredentialsSignin"
            ? "Invalid credentials. Please try again."
            : "An error occurred during authentication."}
        </p>
      </div>
    </div>
  );
}
