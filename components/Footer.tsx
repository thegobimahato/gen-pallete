"use client";

import { GithubIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import GobiImage from "../public/gobi.png";

export default function Footer() {
  return (
    <footer className="flex w-full max-w-5xl mx-auto flex-col items-center justify-between gap-2 border-t px-4 py-4 text-muted-foreground text-sm md:flex-row md:px-6 ">
      {/* Copyright */}
      <span className="text-center md:text-left">
        © {new Date().getFullYear()} Gen Palette. All rights reserved.
      </span>

      {/* Author & GitHub link */}
      <Link
        className="flex items-center gap-3 transition-colors hover:text-primary"
        href="https://github.com/thegobimahato"
        rel="noopener noreferrer"
        target="_blank"
      >
        {/* Profile image in circle */}
        <div className="size-6 overflow-hidden rounded-full">
          <Image
            alt="Gobi Mahato"
            className="h-full w-full object-cover"
            height={24}
            src={GobiImage}
            width={24}
          />
        </div>

        <GithubIcon size={18} />
      </Link>
    </footer>
  );
}
