import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../globals.css"
import Header from "@/components/Layout/HeaderComponents/Header"
import Footer from "@/components/Layout/FooterComponents/Footer"
import { CartProvider } from "../../context/cart"
import { preloadLogoData } from "@/lib/logo-data"
import { getLogoData } from "@/lib/getLogo"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})



// Preload logo data at build time
// export async function generateStaticParams() {
//   // Preload logo data to cache it
//   await preloadLogoData()
//   return []
// }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const logoData = await getLogoData()
  console.log(logoData)
  return (
    <CartProvider>
      <html lang="en">
      <head>
        {/* Preload the logo image for even better LCP */}
        {logoData?.logo?.asset?.url && (
          <link
            rel="preload"
            as="image"
            href={logoData.logo.asset.url}
            fetchPriority="high"
          />
        )}
      </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header logoData={logoData} />
          {children}
          <Footer />
        </body>
      </html>
    </CartProvider>
  )
}
