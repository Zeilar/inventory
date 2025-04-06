import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

export function base64ImageToFile(id: string, base64: string) {
  return new File([Buffer.from(base64, "base64")], `${id}.jpeg`);
}

export function getImagesDir(): string {
  return join(process.cwd(), "public/images");
}

export function getImageFilename(id: string): string {
  return `${id}.jpeg`;
}

export async function writeImageToDisk(id: string, blob: Buffer) {
  const imagesDir = getImagesDir();
  await mkdir(imagesDir, { recursive: true });
  await writeFile(join(imagesDir, getImageFilename(id)), blob);
}

export async function processImage(data: File | Blob, width: number, height: number) {
  return sharp(await data.arrayBuffer())
    .resize(Math.round(width * 0.75), Math.round(height * 0.75))
    .toBuffer();
}
