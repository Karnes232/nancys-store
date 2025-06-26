import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../globals.css"
import Header from "@/components/Layout/HeaderComponents/Header"
// import Footer from "@/components/Layout/FooterComponents/Footer"
import { CartProvider } from "../../context/cart"
import { getLogoData } from "@/lib/getLogo"
import PerformanceMonitor from "@/components/PerformanceMonitor"
import { GoogleAnalytics } from "@next/third-parties/google"
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/Layout/FooterComponents/Footer'), {
  loading: () => <div>Loading...</div>,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const logoData = await getLogoData()

  return (
    <CartProvider>
      <html lang="en">
      <GoogleAnalytics gaId="G-HZ2D75V42H" />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header logoData={logoData} />
          {children}
          <Footer />
          <PerformanceMonitor />
        </body>
      </html>
    </CartProvider>
  )
}
