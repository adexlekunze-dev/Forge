import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sykes Holiday Cottages - Booking Experience Product Vision",
  description: "Demonstrating Conversion Optimization Opportunities for Account, Loyalty & Booking Flows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {/* Prototype Banner */}
          <div className="bg-yellow-50 border-b border-yellow-200 py-2 px-4 text-center">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Prototype:</strong> This is a demonstration prototype showcasing product management methodology and UX optimization. Not a production application.
            </p>
          </div>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}



