"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

import "./globals.css";
import "../styles/font.css";
import "../styles/LoadingScreen.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [navbarOpen, setNavbarOpen] = useState(false);

  // Apply dark class to <html>
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const navItems = [
    { href: "/", label: "Home", icon: "/icons/home.png" },
    { href: "/blog", label: "Blog", icon: "/icons/blog.new.png" },
    { href: "/guide", label: "Guide", icon: "/icons/calendar.png" },
  ];

  return (
    <html lang="en">
      <head>
        {/* Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0e0e0e" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        {/* Optional Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased`}>
        <>
          <ToastContainer></ToastContainer>

          <div className="font-minecraftseven">
            {/* HEADER */}
            <header className="fixed left-1/2 transform -translate-x-1/2 z-20 w-11/12 md:w-2/3 bg-gray-800 rounded-lg shadow-lg p-6 mt-7">
              <div className="flex justify-between items-center">
                <button
                  aria-label={navbarOpen ? "Close menu" : "Open menu"}
                  aria-expanded={navbarOpen}
                  className="text-white md:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#78D5F5]"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={
                        navbarOpen
                          ? "M6 18L18 6M6 6l12 12"
                          : "M4 6h16M4 12h16m-7 6h7"
                      }
                    />
                  </svg>
                </button>
              </div>

              {/* NAVIGATION */}
              <nav
                className={`${
                  navbarOpen ? "block" : "hidden"
                } mt-4 md:mt-0 md:flex md:justify-around items-center gap-5`}
              >
                {navItems.map(({ href, label, icon }) => (
                  <Link href={href} key={label} legacyBehavior>
                    <Link
                      className="flex items-center gap-3 px-6 py-4 text-2xl font-bold rounded-md transition-transform duration-300 ease-in-out
                    bg-gradient-to-br from-[#162d3e] to-[#0b1823]
                    text-[#78D5F5] shadow-[3px_3px_0_#000] hover:scale-110 hover:shadow-[6px_6px_0_#0d4f7f] outline-2 outline outline-[#78D5F5]"
                      style={{ fontFamily: "MinecraftSeven" }}
                      href={href}
                      legacyBehavior
                    >
                      <Image
                        src={icon}
                        alt={label}
                        width={28}
                        height={28}
                        className="w-7 h-7 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]"
                      />
                      <span className="select-none">{label}</span>
                    </Link>
                  </Link>
                ))}

                {/* Copy IP Button */}
                <button
                  onClick={() => {
                    toast("Copied IP to clipboard", { type: "success" });
                    navigator.clipboard.writeText("crystopia.net");
                  }}
                  className="flex items-center gap-3 px-8 py-4 text-2xl font-bold rounded-md transition-transform duration-300 ease-in-out
                bg-gradient-to-br from-[#162d3e] to-[#0b1823]
                text-[#78D5F5] shadow-[3px_3px_0_#000] hover:scale-110 hover:shadow-[6px_6px_0_#0d4f7f] outline-2 outline outline-[#78D5F5]"
                  style={{ fontFamily: "MinecraftSeven" }}
                >
                  <Image
                    src="/icons/copy-ip.png"
                    alt="Copy IP"
                    width={28}
                    height={28}
                    className="w-7 h-7 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]"
                  />
                  <span className="select-none">CRYSTOPIA.NET</span>
                </button>
              </nav>
            </header>

            {/* MAIN */}
            <main className="min-h-screen pb-16 pt-28 md:pt-36 lg:pt-44 md:pb-24 lg:pb-32">
              {children}
            </main>

            {/* FOOTER */}
            <footer className="rounded-lg shadow-lg w-full max-w-3xl p-6 mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4 text-yellow-900">
                  <Link
                    href="https://discord.crystopia.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    legacyBehavior
                  >
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
                    rel="noopener noreferrer"
                    legacyBehavior
                  >
                    <Image
                      src="/icons/youtube.png"
                      alt="YouTube"
                      width={20}
                      height={20}
                    />
                  </Link>
                </div>

                <div className="text-center text-sm text-black mt-2 md:mt-0">
                  <p className="font-semibold">Crystopia.net © 2024-2025</p>
                  <p>
                    We are in no way affiliated with or endorsed by Mojang, AB.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-center space-x-6 text-[#78D5F5] text-sm font-medium">
                <Link href="/legal/imprint">Imprint</Link>
                <Link href="/legal/privacy">Privacy</Link>
                <Link href="/legal/terms">Terms</Link>
              </div>
            </footer>
            <br />
            <br />
          </div>
        </>
      </body>
    </html>
  );
}
