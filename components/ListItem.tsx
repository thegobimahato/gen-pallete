"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";

// Type props
type ListItemProps = {
  rgb: string;
  hex: string;
  loading?: boolean;
};

export default function ListItem({ rgb, hex, loading = false }: ListItemProps) {
  const [copied, setCopied] = useState(false);

  // Safer clipboard copy with try/catch
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      toast.success(`Copied ${hex} to clipboard!`);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Failed to copy to clipboard.");
    }
  };

  // If loading, show skeleton
  if (loading) {
    return (
      <li className="aspect-square w-full animate-pulse rounded bg-muted shadow md:h-60 md:w-60" />
    );
  }

  // Common icon transition classes
  const iconClasses = "absolute transition-all";

  return (
    <li
      className="flex aspect-square w-full flex-col items-center justify-end overflow-hidden rounded shadow transition hover:scale-105 md:h-60 md:w-60"
      style={{ backgroundColor: rgb }}
    >
      <div className="flex w-full items-center justify-between bg-white/80 px-2 py-1 text-black backdrop-blur-sm dark:bg-black/60 dark:text-white">
        <span className="text-sm">{hex}</span>

        <button
          aria-label={copied ? "Copied" : "Copy HEX"}
          className="relative flex h-5 w-5 items-center justify-center"
          onClick={copyToClipboard}
        >
          {/* Show check icon when copied */}
          <CheckIcon
            aria-hidden="true"
            size={16}
            className={`${iconClasses} ${
              copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          />

          {/* Show copy icon when not copied */}
          <CopyIcon
            aria-hidden="true"
            size={16}
            className={`${iconClasses} ${
              copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
            }`}
          />
        </button>
      </div>
    </li>
  );
}
