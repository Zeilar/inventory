export function getImageFilename(id: string): string {
  return `${id}.jpeg`;
}

export function getImageSrc(id: string) {
  return `/images/${id}.jpeg`;
}

export const imagesPath = "public/images";
