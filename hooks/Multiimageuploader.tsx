"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import useCloudinaryUpload, { UploadFolder } from "./Usecloudinaryupload ";

interface MultiImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  folder: UploadFolder;
  maxImages?: number;
}

export function MultiImageUploader({ value, onChange, folder, maxImages = 5 }: MultiImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadSingle, error } = useCloudinaryUpload();
  const [pendingCount, setPendingCount] = useState(0);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    const remaining = maxImages - value.length;
    if (remaining <= 0) {
      toast.error(`You can upload up to ${maxImages} images`);
      return;
    }

    const selected = Array.from(files).slice(0, remaining);
    setPendingCount(selected.length);

    const uploaded: string[] = [];
    for (const file of selected) {
      try {
        const result = await uploadSingle(file, { folder });
        uploaded.push(result.url);
      } catch {
        toast.error(error?.message ?? `Could not upload ${file.name}`);
      }
    }

    setPendingCount(0);
    if (uploaded.length > 0) {
      onChange([...value, ...uploaded]);
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {value.map((url, i) => (
          <div key={url} className="group relative aspect-square overflow-hidden rounded-xl border border-border">
            <Image src={url} alt={`Image ${i + 1}`} fill className="object-cover" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {value.length < maxImages && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={pendingCount > 0}
            className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-border text-muted-foreground transition hover:bg-muted disabled:opacity-50"
          >
            {pendingCount > 0 ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Upload className="h-5 w-5" />
                <span className="text-[11px] font-semibold">Add photo</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <p className="mt-2 text-[11px] text-muted-foreground">
        {value.length} / {maxImages} images
      </p>
    </div>
  );
}