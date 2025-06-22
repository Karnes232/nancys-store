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
      const startTime = Date.now()
      
      const data = await client.fetch(`
        *[_type == "generalLayout"][0] {
          logo {
            asset->{
              url,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          },
          companyName
        }
      `, {}, {
        cache: 'force-cache',
        next: { 
          revalidate: 86400, // 24 hours
          tags: ['logo']
        }
      })
      
      console.log(`Logo data fetched in ${Date.now() - startTime}ms`)
      return data
    } catch (error) {
      console.error('Failed to fetch logo:', error)
      return null
    }
  }