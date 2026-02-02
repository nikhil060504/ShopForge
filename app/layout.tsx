import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "ShopForge",
    description: "AI-powered website builder for shops",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
