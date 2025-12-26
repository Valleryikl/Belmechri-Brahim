import "./globals.css";

import { Poppins, Cormorant_Garamond } from 'next/font/google';

export const metadata = { title: 'Portfolio', description: 'First cut' }


const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-title"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins"
});

const poppinsItalic = Poppins({
  subsets: ["latin"],
  weight: ["300","400"],
  style: "italic",
  variable: "--font-poppinsItalic"
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${poppinsItalic.variable} ${cormorant.variable} bg-black text-white`}>{children}</body>
    </html>
  )
}
