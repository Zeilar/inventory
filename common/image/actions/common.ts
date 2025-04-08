import { mkdir, rm, writeFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";
import { getImageFilename, imagesPath } from "../path";

export function base64ImageToFile(id: string, base64: string) {
  return new File([Buffer.from(base64, "base64")], `${id}.jpeg`);
}

export function getImagesDir(): string {
  return join(process.cwd(), imagesPath);
}

export async function writeImageToDisk(id: string, blob: Buffer): Promise<void> {
  const imagesDir = getImagesDir();
  await Promise.all([
    mkdir(imagesDir, { recursive: true }),
    writeFile(join(imagesDir, getImageFilename(id)), blob),
  ]);
}

export async function removeImageFromDisk(id: string): Promise<void> {
  const imagesDir = getImagesDir();
  await rm(join(imagesDir, getImageFilename(id)));
}

export async function processImage(
  data: File | Blob,
  _width: number,
  _height: number
): Promise<Buffer<ArrayBufferLike>> {
  return sharp(await data.arrayBuffer()).toBuffer();
}
