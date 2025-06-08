import { Roboto } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
});
