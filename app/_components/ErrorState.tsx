"use client";

interface ErrorStateProps {
  title?: string;
  message?: string;
}

export function ErrorState({
  title = "Error loading cocktails",
  message = "Please try again later",
}: ErrorStateProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8 text-center">{title}</h1>
        <p className="text-xl text-center text-red-400">{message}</p>
      </div>
    </main>
  );
}
