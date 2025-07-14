'use client';

import { AlertCircleIcon, ImageUpIcon, XIcon } from 'lucide-react';
import { useEffect } from 'react';

import { useFileUpload } from '@/hooks/use-file-upload';

interface FileUploadProps {
  onImageChange: (previewUrl: string | null) => void;
}

export default function FileUpload({ onImageChange }: FileUploadProps) {
  // Config: max file size in bytes
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;

  // File upload hook setup
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: 'image/*',
    maxSize,
  });

  // Get preview URL
  const previewUrl = files[0]?.preview || null;

  // Notify parent when preview changes
  useEffect(() => {
    onImageChange(previewUrl || null);
  }, [previewUrl, onImageChange]);

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      {/* Upload area */}
      <div className="relative">
        <div
          className="relative flex min-h-60 w-full flex-col items-center justify-center overflow-hidden rounded-xl border-3 border-dashed p-4 transition-colors hover:bg-accent/50 has-[input:focus]:border-ring has-[img]:border-none has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 "
          data-dragging={isDragging || undefined}
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          role="button"
        >
          <input {...getInputProps()} className="sr-only" />

          {previewUrl ? (
            // Preview image
            <div className="absolute inset-0">
              <img
                alt={files[0]?.file?.name || 'Uploaded image'}
                className="h-full w-full object-cover"
                src={previewUrl}
              />
            </div>
          ) : (
            // Empty state content
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                aria-hidden="true"
                className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
              >
                <ImageUpIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 font-medium text-sm md:text-lg">
                Drop your image here or click to browse
              </p>
              <p className="text-muted-foreground">Max size: {maxSizeMB}MB</p>
            </div>
          )}
        </div>

        {/* Remove image button */}
        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              aria-label="Remove image"
              className="z-50 flex size-8 items-center justify-center rounded-full bg-black/60 text-white outline-none transition hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 "
              onClick={() => removeFile(files[0]?.id)}
              type="button"
            >
              <XIcon className="size-5" />
            </button>
          </div>
        )}
      </div>

      {/* Error state */}
      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-destructive text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
