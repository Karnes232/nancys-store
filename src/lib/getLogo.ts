import { client } from "@/sanity/lib/client"

export interface LogoData {
  logo: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }
  companyName: string
}

export async function getLogoData(): Promise<LogoData | null> {
  try {
    const data = await client.fetch(`
      *[_type == "generalLayout"][0] {
        logo {
          asset->{
            url,
            metadata {
              dimensions {
                width,
                height
              },
            }
          },
          alt
        },
        companyName
      }
    `, {}, {
      // Enable caching for better performance
      cache: 'force-cache',
      next: { 
        revalidate: 3600, // Revalidate every hour
        tags: ['logo'] // For on-demand revalidation
      }
    })
    return data
  } catch (error) {
    console.error('Failed to fetch logo:', error)
    return null
  }
}