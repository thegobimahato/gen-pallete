"use client";

import Image from "next/image";
import Link from "next/link";

import ThemeToggle from "./ui/theme-toggle";

export default function Header() {
  return (
    <header className="flex justify-center py-4">
      <div className="flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border bg-background/70 px-6 py-2 shadow-md backdrop-blur-md ">
        {/* Logo & brand name */}
        <Link className="flex items-center gap-1" href="/">
          <div className="flex h-10 w-10 items-center justify-center">
            <Image
              alt="Gen Palette Logo"
              className="h-7 w-7"
              height={24}
              src="/logo.svg"
              width={24}
            />
          </div>
          <span className="font-bold text-lg text-primary md:text-2xl">
            Gen <span className="font-light">Palette</span>
          </span>
        </Link>

        {/* Theme toggle on the right */}
        <ThemeToggle />
      </div>
    </header>
  );
}
