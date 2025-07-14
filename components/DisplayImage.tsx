"use client";

import ListItem from "./ListItem";
import { AuroraText } from "./ui/aurora-text";

interface DisplayImageProps {
  palette: number[][] | null;
}

export default function DisplayImage({ palette }: DisplayImageProps) {
  const isLoading = !palette;

  // Convert RGB array to HEX string
  const rgbToHex = (rgb: number[]) =>
    "#" +
    rgb
      .map((c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");

  return (
    <section className="space-y-6">
      <h1 className="text-center font-bold text-3xl leading-tight md:text-5xl">
        <span className="mr-2 text-muted-foreground">Generate</span>
        <AuroraText>Color Palette&apos;s</AuroraText>
      </h1>

      {/* Grid of color swatches */}
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? // Render skeleton loaders when loading
            Array.from({ length: 8 }).map((_, i) => (
              <ListItem hex="" key={i} loading rgb="" />
            ))
          : // Render color swatches when palette is ready
            palette?.map((color, i) => {
              const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
              const hex = rgbToHex(color);
              return <ListItem hex={hex} key={i} rgb={rgb} />;
            })}
      </ul>
    </section>
  );
}
