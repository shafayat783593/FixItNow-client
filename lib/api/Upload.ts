"use server";

import { serverFetch } from "@/lib/api/serverFetch";

export interface ICloudinarySignature {
  timestamp: number;
  signature: string;
  cloudName: string;
  apiKey: string;
  folder: string;
}

export async function getCloudinarySignatureAction(
  folder: "profiles" | "blog" | "services"
): Promise<{ success: boolean; message?: string; data?: ICloudinarySignature }> {
  const res = await serverFetch(`/api/upload/cloudinary-sign?folder=${folder}`);
  return res;
}