'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ListItemProps {
  rgb: string;
  hex: string;
  loading?: boolean;
}

export default function ListItem({ rgb, hex, loading = false }: ListItemProps) {
  const [copied, setCopied] = useState(false);

  // Handle copy to clipboard with feedback
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(hex);
    setCopied(true);
    toast.success(`Copied ${hex} to clipboard!`);
    setTimeout(() => setCopied(false), 1500);
  };

  // Skeleton loader when in loading state
  if (loading) {
    return (
      <li className="aspect-square w-full animate-pulse rounded bg-muted shadow md:h-60 md:w-60 " />
    );
  }

  return (
    <li
      className="flex aspect-square w-full flex-col items-center justify-end overflow-hidden rounded shadow transition hover:scale-105 md:h-60 md:w-60 "
      style={{ backgroundColor: rgb }}
    >
      {/* Bottom bar with HEX code and copy button */}
      <div className="flex w-full items-center justify-between bg-white/80 px-2 py-1 text-black backdrop-blur-sm dark:bg-black/60 dark:text-white ">
        <span className="font-mono text-xs">{hex}</span>
        <button
          aria-label={copied ? 'Copied' : 'Copy HEX'}
          className="relative flex h-5 w-5 items-center justify-center"
          onClick={copyToClipboard}
        >
          {/* Check icon when copied */}
          <CheckIcon
            aria-hidden="true"
            className={`absolute transition-all ${
              copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
            size={16}
          />
          {/* Copy icon when not copied */}
          <CopyIcon
            aria-hidden="true"
            className={`absolute transition-all ${
              copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
            }`}
            size={16}
          />
        </button>
      </div>
    </li>
  );
}
