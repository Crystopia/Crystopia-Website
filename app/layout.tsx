"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";
import "../styles/font.css";
import "../styles/LoadingScreen.css";

const navItems = [
  { href: "/", label: "Home", icon: "/icons/home.png" },
  { href: "/blog", label: "Blog", icon: "/icons/blog.new.png" },
  { href: "/guide", label: "Guide", icon: "/icons/calendar.png" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0e0e0e" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="antialiased bg-background text-foreground font-minecraftseven">
        <ToastContainer
          position="bottom-center"
          autoClose={500}
          hideProgressBar={true}
          closeOnClick
          rtl={false}
          theme="dark"
        />
        {/* HEADER */}
        <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-11/12 md:w-2/3">
          <Card className="bg-[#111] border border-[#78D5F5]/30 shadow-lg p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-[#78D5F5] tracking-wide">
                Crystopia
              </h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="md:hidden border-[#78D5F5] text-[#78D5F5]"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-[#0b1823] text-[#78D5F5]">
                  <nav className="flex flex-col gap-4 mt-8">
                    {navItems.map(({ href, label, icon }) => (
                      <Link
                        key={label}
                        href={href}
                        className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-[#162d3e]"
                      >
                        <Image src={icon} alt={label} width={24} height={24} />
                        {label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>

              <nav className="hidden md:flex gap-4">
                {navItems.map(({ href, label, icon }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-2 px-4 py-2 rounded-md text-[#78D5F5] bg-[#0b1823] hover:scale-105 transition-all border border-[#78D5F5]"
                  >
                    <Image src={icon} alt={label} width={24} height={24} />
                    {label}
                  </Link>
                ))}
                <Link
                  href={"#"}
                  onClick={() => {
                    toast("Copied IP to clipboard", { type: "success" });
                    navigator.clipboard.writeText("crystopia.net");
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-[#78D5F5] bg-[#0b1823] hover:scale-105 transition-all border border-[#78D5F5]"
                >
                  <Image
                    src="/icons/copy-ip.png"
                    alt="Copy IP"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  CRYSTOPIA.NET
                </Link>
              </nav>
            </div>
          </Card>
        </header>

        {/* MAIN */}
        <main className="pt-32 pb-20 px-4">{children}</main>

        {/* FOOTER */}
        <footer className="bg-[#0e0e0e] border-t border-[#1e1e1e] text-white py-8 px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              <Link href="https://discord.crystopia.net" target="_blank">
                <Image
                  src="/icons/discord.png"
                  alt="Discord"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href="https://www.youtube.com/@CrystopiaNet"
                target="_blank"
              >
                <Image
                  src="/icons/youtube.png"
                  alt="YouTube"
                  width={20}
                  height={20}
                />
              </Link>
            </div>

            <div className="text-sm text-center md:text-left">
              <p className="font-semibold">Crystopia.net © 2024-2025</p>
              <p>Not affiliated with Mojang AB.</p>
            </div>
          </div>

          <div className="mt-6 text-sm text-center text-[#78D5F5] space-x-6">
            <Link href="/legal/imprint">Imprint</Link>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
