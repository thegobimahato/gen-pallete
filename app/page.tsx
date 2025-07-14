"use client";

import ColorThief from "colorthief";
import { useEffect, useRef, useState } from "react";

import DisplayImage from "@/components/DisplayImage";
import FileUpload from "@/components/FileUpload";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [colorPalette, setColorPalette] = useState<number[][] | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Handler: Called by FileUpload when image changes
  const handleImageChange = (previewUrl: string | null) => {
    if (previewUrl) {
      setUploadedImage(previewUrl);
    } else {
      setUploadedImage(null);
      setColorPalette(null);
    }
  };

  // Extract palette when a new image loads
  useEffect(() => {
    if (uploadedImage && imageRef.current) {
      const img = imageRef.current;

      img.onload = () => {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, 8);
        setColorPalette(palette);
      };
    }
  }, [uploadedImage]);

  return (
    <div className="relative mx-auto max-w-7xl px-4 md:px-6">
      <Header />

      <main className="flex min-h-screen flex-col items-center justify-start gap-6 py-6 md:py-12">
        <FileUpload onImageChange={handleImageChange} />

        {/* Hidden image for ColorThief */}
        {uploadedImage && (
          <img
            alt="hidden source"
            className="hidden"
            crossOrigin="anonymous"
            ref={imageRef}
            src={uploadedImage}
          />
        )}

        {/* Display extracted color palette */}
        <DisplayImage palette={colorPalette} />
      </main>

      <Footer />
    </div>
  );
}
