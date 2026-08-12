"use client";

import { getCloudinarySignatureAction } from "@/lib/api/Upload";
import { useCallback, useRef, useState } from "react";

const MAX_FILE_SIZE_MB = 10;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

interface UploadError {
  message: string;
  code: string;
}

const createError = (message: string, code: string): UploadError => ({ message, code });

const validateFile = (file: File) => {
  if (!file) {
    throw createError("No file selected", "NO_FILE");
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw createError("Unsupported file type. Use JPG, PNG or WEBP.", "INVALID_FILE_TYPE");
  }

  const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    throw createError(`Image size must be under ${MAX_FILE_SIZE_MB}MB`, "FILE_TOO_LARGE");
  }
};

export type UploadFolder = "profiles" | "blog" | "services";

interface UploadOptions {
  folder: UploadFolder;
  onProgress?: (percent: number) => void;
}

interface UploadResult {
  url: string;
  publicId: string;
}

export function useCloudinaryUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<UploadError | null>(null);

  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const uploadSingle = useCallback(async (file: File, options: UploadOptions): Promise<UploadResult> => {
    const { folder, onProgress } = options;

    setUploading(true);
    setError(null);

    try {
      validateFile(file);

      const signRes = await getCloudinarySignatureAction(folder);
      if (!signRes.success || !signRes.data) {
        throw createError(signRes.message ?? "Could not get upload permission", "SIGN_FAILED");
      }
      const { signature, timestamp, apiKey, cloudName, folder: scopedFolder } = signRes.data;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", scopedFolder);

      const uploadPromise = new Promise<UploadResult>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhrRef.current = xhr;

        xhr.upload.onprogress = (e) => {
          if (!e.lengthComputable) return;
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress?.(percent);
        };

        xhr.onload = () => {
          let response: any = {};
          try {
            response = JSON.parse(xhr.responseText || "{}");
          } catch {
            // fall through with empty response, handled by !secure_url check below
          }

          if (xhr.status >= 400 || !response.secure_url) {
            reject(createError(response?.error?.message || "Upload failed", "UPLOAD_FAILED"));
            return;
          }

          resolve({ url: response.secure_url, publicId: response.public_id });
        };

        xhr.onerror = () => reject(createError("Network error", "NETWORK_ERROR"));

        xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`);
        xhr.send(formData);
      });

      return await uploadPromise;
    } catch (err) {
      setError(err as UploadError);
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  const cancelUpload = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      xhrRef.current = null;
      setUploading(false);
    }
  };

  return { uploadSingle, cancelUpload, uploading, error };
}

export default useCloudinaryUpload;