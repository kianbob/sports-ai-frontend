import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sports AI Assistant",
  description: "AI-powered sports assistant for NFL and NBA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
