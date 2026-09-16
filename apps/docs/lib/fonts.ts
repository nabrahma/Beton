import { Archivo, JetBrains_Mono, Public_Sans } from "next/font/google";

export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/** Put on <html> by every root layout. */
export const fontVariables = `${archivo.variable} ${publicSans.variable} ${jetbrainsMono.variable}`;
