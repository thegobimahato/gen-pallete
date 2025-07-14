"use client";

import ListItem from "./ListItem";
import { AuroraText } from "./ui/aurora-text";

// RGB tuple type
export type RGBColor = [number, number, number];

interface DisplayImageProps {
  palette: RGBColor[] | null;
}

export default function DisplayImage({ palette }: DisplayImageProps) {
  const isLoading = !palette?.length;

  /**
   * Convert RGB [R,G,B] to HEX string.
   */
  const rgbToHex = (rgb: RGBColor): string =>
    `#${rgb.map((c) => c.toString(16).padStart(2, "0")).join("")}`;

  return (
    <section className="space-y-6">
      <h1 className="text-center text-3xl md:text-5xl font-bold leading-tight">
        <span className="mr-2 text-muted-foreground">Generate</span>
        <AuroraText>Color Palettes</AuroraText>
      </h1>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading
          ? // If loading, show 8 skeleton placeholder <ListItem>s.
            Array.from({ length: 8 }).map((_, i) => (
              <ListItem key={i} rgb="" hex="" loading />
            ))
          : // If we have a palette, render each extracted color as a <ListItem>.
            palette!.map((rgb, i) => {
              // Convert RGB tuple to HEX string.
              const hex = rgbToHex(rgb);
              // Format RGB tuple as CSS rgb() string.
              const rgbString = `rgb(${rgb.join(", ")})`;
              // Render one color swatch card.
              return <ListItem key={i} rgb={rgbString} hex={hex} />;
            })}
      </ul>
    </section>
  );
}
