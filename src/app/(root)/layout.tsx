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

  let preloadUrl = ''
  if (logoData?.logo?.asset?.url) {
    preloadUrl = logoData.logo.asset.url.includes('cdn.sanity.io')
      ? `${logoData.logo.asset.url}?w=300&h=200&q=75&auto=format&fit=max&fm=webp`
      : logoData.logo.asset.url
  }

  return (
    <CartProvider>
      <html lang="en">
       <head>
        {/* Critical: Preload the optimized logo */}
        {preloadUrl && (
          <>
            <link
              rel="preload"
              as="image"
              href={preloadUrl}
              fetchPriority="high"
            />
            <link rel="dns-prefetch" href="//cdn.sanity.io" />
            <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
          </>
        )}
        
        {/* Inline critical CSS to prevent render blocking */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .logo-container { 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              padding: 0.5rem 0; 
            }
            .logo-container img {
              max-width: 250px;  
              max-height: 150px;
              width: auto;
              height: auto;
            }
          `
        }} />
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
