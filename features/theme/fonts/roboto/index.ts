import localFont from "next/font/local";

export const roboto = localFont({
  src: [
    {
      path: "./roboto-latin-400-normal.woff2",
      weight: "400",
    },
    {
      path: "./roboto-latin-500-normal.woff2",
      weight: "500",
    },
    {
      path: "./roboto-latin-600-normal.woff2",
      weight: "600",
    },
    {
      path: "./roboto-latin-700-normal.woff2",
      weight: "700",
    },
  ],
});
