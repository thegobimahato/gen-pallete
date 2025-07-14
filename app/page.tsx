"use client";

import { useEffect, useRef, useState } from "react";
import ColorThief from "colorthief";

import DisplayImage from "@/components/DisplayImage";
import FileUpload from "@/components/FileUpload";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// Color palette is an array of RGB triplets.
type RGBColor = [number, number, number];

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [colorPalette, setColorPalette] = useState<RGBColor[] | null>(null);

  // typed image ref
  const imageRef = useRef<HTMLImageElement | null>(null);

  /**
   * Called by FileUpload when the user selects or removes an image.
   */
  const handleImageChange = (previewUrl: string | null) => {
    if (previewUrl) {
      setUploadedImage(previewUrl);
    } else {
      setUploadedImage(null);
      setColorPalette(null);
    }
  };

  /**
   * When a new image is uploaded, extract its color palette using ColorThief.
   */
  useEffect(() => {
    if (!uploadedImage || !imageRef.current) return;

    const img = imageRef.current;

    const handleLoad = () => {
      try {
        const colorThief = new ColorThief();
        // ColorThief types are not declared, so ensure we get an array of RGB arrays.
        const palette = colorThief.getPalette(img, 8) as RGBColor[];
        setColorPalette(palette);
      } catch (error) {
        console.error("Failed to extract palette:", error);
        setColorPalette(null);
      }
    };

    img.addEventListener("load", handleLoad);

    // Clean up listener on unmount or re-run.
    return () => {
      img.removeEventListener("load", handleLoad);
    };
  }, [uploadedImage]);

  return (
    <div className="relative mx-auto max-w-7xl px-4 md:px-6">
      <Header />

      <main className="flex min-h-screen flex-col items-center justify-start gap-6 py-6 md:py-12">
        <FileUpload onImageChange={handleImageChange} />

        {/* Hidden image used for ColorThief color extraction */}
        {uploadedImage && (
          <img
            ref={imageRef}
            src={uploadedImage}
            alt="Uploaded hidden source"
            crossOrigin="anonymous"
            className="hidden"
          />
        )}

        {/* Display extracted palette if available */}
        <DisplayImage palette={colorPalette} />
      </main>

      <Footer />
    </div>
  );
}
