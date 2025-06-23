import type { MetadataRoute } from "next"
import { client } from "@/sanity/lib/client"

interface SanityPage {
  _id: string
  _updatedAt: string
  slug: { current: string } // Assuming slug is an object with current property
}

async function getSanityPagesForSitemap(): Promise<SanityPage[]> {
  const query = `
        *[_type == "product"] {
            _id,
            _updatedAt,
            slug
        }
    `

  const pages = await client.fetch<SanityPage[]>(query)
  return pages
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getSanityPagesForSitemap()
  const pagesUrlsEnglish = pages.map(page => {
    return {
      url: `https://esenciasbynancy.com/products/${page.slug.current}`,
      lastModified: new Date(page._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 1,
    }
  })
  const pagesUrlsSpanish = pages.map(page => {
    return {
      url: `https://esenciasbynancy.com/es/products/${page.slug.current}`,
      lastModified: new Date(page._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 1,
    }
  })

  return [
    {
      url: "https://esenciasbynancy.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://esenciasbynancy.com/es",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://esenciasbynancy.com/about-us",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://esenciasbynancy.com/es/about-us",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://esenciasbynancy.com/photo-gallery",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://esenciasbynancy.com/es/photo-gallery",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://esenciasbynancy.com/cart",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://esenciasbynancy.com/es/cart",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://esenciasbynancy.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://esenciasbynancy.com/es/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://esenciasbynancy.com/thankyou",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://esenciasbynancy.com/es/thankyou",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...pagesUrlsEnglish,
    ...pagesUrlsSpanish,
  ]
}
