"use client";

import { ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";

interface LinkOptions {
  guide: string;
  title: string;
  external?: boolean;
}

export default function GuideLink(linkOptions: LinkOptions) {
  return (
    <>
      <Link
        href={`/guide?guide=${linkOptions.guide}`}
        className="
        text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        target={linkOptions.external ? "_blank" : "_self"}
      >
        {linkOptions.title}{" "}
        {linkOptions.external ? <ExternalLink className="w-4 h-4" /> : <></>}
      </Link>
    </>
  );
}
