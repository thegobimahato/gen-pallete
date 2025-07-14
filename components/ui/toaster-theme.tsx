"use client";

import { useTheme } from "next-themes";
import { Toaster } from "./sonner";

export default function ToasterTheme() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      closeButton
      position="bottom-right"
      expand={true}
      richColors
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
