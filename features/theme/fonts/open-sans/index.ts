import { Open_Sans } from "next/font/google";

export const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
});
