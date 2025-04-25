
// /products/[slug]/page.tsx

import { fallbackLng } from "@/i18n/settings"
import ProductPage from "../../[lang]/products/[slug]/page"
import { Metadata } from "next"

// interface RootPageProps {
//   params: { slug: string }
// }

// Function to get all available product slugs for static paths at the root level
export async function generateStaticParams() {
  // Import client from sanity library
  const { client } = await import("@/sanity/lib/client")
  
  // Get all products
  const productSlugs = await client.fetch(`
    *[_type == "product"] {
      "slug": slug.current
    }
  `)
  
  return productSlugs.map((product: { slug: string }) => ({
    slug: product.slug
  }))
}

export async function generateMetadata({
  params,
}): Promise<Metadata> {
  // Import the language-specific metadata generation function
  const { generateMetadata: langGenerateMetadata } = await import(
    "../../[lang]/products/[slug]/page"
  )
  
  // Pass params as an object, not a Promise
  return langGenerateMetadata({
    params: { lang: fallbackLng, slug: params.slug },
  })
}

export default function RootProductPage({ params }) {
  // Pass params as an object, not a Promise
  return <ProductPage params={{ lang: fallbackLng, slug: params.slug }} />
}