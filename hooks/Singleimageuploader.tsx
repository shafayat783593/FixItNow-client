"use client";

import { useRef } from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import useCloudinaryUpload, { UploadFolder } from "./Usecloudinaryupload ";

interface SingleImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder: UploadFolder;
  shape?: "square" | "circle";
}

export function SingleImageUploader({ value, onChange, folder, shape = "square" }: SingleImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadSingle, uploading, error } = useCloudinaryUpload();

  async function handleFile(file: File | undefined) {
    if (!file) return;
    try {
      const result = await uploadSingle(file, { folder });
      onChange(result.url);
    } catch {
      toast.error(error?.message ?? "Upload failed");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const roundedClass = shape === "circle" ? "rounded-full" : "rounded-2xl";

  return (
    <div className="flex items-center gap-4">
      <div className={`relative h-20 w-20 shrink-0 overflow-hidden border border-border bg-muted ${roundedClass}`}>
        {value ? (
          <Image src={value} alt="Preview" fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <Upload className="h-5 w-5" />
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-foreground transition hover:bg-muted disabled:opacity-50"
        >
          {uploading ? "Uploading..." : value ? "Change image" : "Upload image"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-destructive"
          >
            <X className="h-3 w-3" /> Remove
          </button>
        )}
      </div>
    </div>
  );
}