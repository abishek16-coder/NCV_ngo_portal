import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type UploadResult = {
  url: string;
  publicId: string;
  secureUrl: string;
  format: string;
  bytes: number;
};

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const ALLOWED_DOCUMENT_TYPES = ["application/pdf"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function uploadImage(
  file: string,
  folder = "ncv-ngo/images"
): Promise<UploadResult> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [
      { quality: "auto", fetch_format: "auto" },
    ],
  });

  return {
    url: result.url,
    publicId: result.public_id,
    secureUrl: result.secure_url,
    format: result.format,
    bytes: result.bytes,
  };
}

export async function uploadPdf(
  file: string,
  folder = "ncv-ngo/documents"
): Promise<UploadResult> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "raw",
    allowed_formats: ["pdf"],
  });

  return {
    url: result.url,
    publicId: result.public_id,
    secureUrl: result.secure_url,
    format: result.format,
    bytes: result.bytes,
  };
}

export async function deleteFile(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export function validateFile(
  file: { mimetype: string; size: number },
  type: "image" | "document" = "image"
): string | null {
  if (file.size > MAX_FILE_SIZE) {
    return "File size must be less than 5MB";
  }

  if (type === "image" && !ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    return "Only JPEG, JPG, and PNG files are allowed";
  }

  if (type === "document" && !ALLOWED_DOCUMENT_TYPES.includes(file.mimetype)) {
    return "Only PDF files are allowed";
  }

  return null;
}

export function getCloudinaryPublicId(url: string): string | null {
  const regex = /\/v\d+\/(.+?)\.(jpg|jpeg|png|pdf)$/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export { cloudinary };
