"use client";

import { ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";

interface H1LinkOptions {
  title: string;
  tag: string;
  type:
    | "text-xl"
    | "text-2xl"
    | "text-3xl"
    | "text-4xl"
    | "text-5xl"
    | "text-6xl"
    | "text-7xl"
    | "text-8xl"
    | "text-9xl";
}

export default function TagLinks(h1LinkOptions: H1LinkOptions) {
  return (
    <>
      <Link
        href={`#${h1LinkOptions.tag}`}
        className={`text-white ${h1LinkOptions.type} mt-2 mb-2 flex`}
        id={h1LinkOptions.tag}
      >
        <p className="inline-flex items-center gap-2 cursor-auto">
          <ChevronRight
            className="inline text-xs justify-center text-blue-500 hover:text-blue-900 hover:transform hover:scale-105 transition-transform cursor-pointer"
            size={30}
          />{" "}
          {h1LinkOptions.title}{" "}
        </p>
      </Link>
    </>
  );
}
