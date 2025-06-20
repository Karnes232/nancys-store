import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../globals.css"
import Header from "@/components/Layout/HeaderComponents/Header"
import Footer from "@/components/Layout/FooterComponents/Footer"
import { CartProvider } from "../../context/cart"
import { preloadLogoData } from "@/lib/logo-data"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Nancy Store",
  description: "Welcome to Nancy Store",
}

// Preload logo data at build time
export async function generateStaticParams() {
  // Preload logo data to cache it
  await preloadLogoData()
  return []
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CartProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </CartProvider>
  )
}
