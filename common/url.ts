/**
 * @example buildAppUrl("/api/settings")
 */
export function buildAppUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}
