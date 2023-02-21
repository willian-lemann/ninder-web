import { v2 as cloudinary } from "cloudinary";

const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

cloudinary.config({
  secure: true,
  api_key: API_KEY,
  api_secret: API_SECRET,
  cloud_name: CLOUD_NAME,
});

export const cloudinaryapi = cloudinary;
