/**
 * @returns \`${id}.webp\`
 */
export function getImageFilename(id: string): string {
  return `${id}.webp`;
}

/**
 * @returns \`/images/${id}.webp\`
 */
export function getImageSrc(id: string) {
  return `/images/${id}.webp`;
}

/**
 * @returns \"public/images\"
 */
export const imagesPath = "public/images";
