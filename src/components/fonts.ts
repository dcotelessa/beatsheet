import { Inter, Montserrat, Rock_Salt } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const montserrat = Montserrat({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const rockSalt = Rock_Salt({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
