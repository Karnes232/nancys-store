import { client } from "@/sanity/lib/client"

// In-memory cache for logo data
let logoDataCache: any = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes cache

export async function getLogoData() {
  const now = Date.now()

  // Return cached data if it's still valid
  if (logoDataCache && now - cacheTimestamp < CACHE_DURATION) {
    return logoDataCache
  }

  try {
    const data = await client.fetch(
      `
      *[_type == "generalLayout"][0] {
        logo {
          asset->{
            url,
            metadata {
              dimensions {
                width,
                height
              },
              lqip,
              palette
            }
          },
          alt,
          hotspot,
          crop
        },
        companyName
      }
    `,
      {},
      {
        // Force cache for 10 minutes
        next: { revalidate: 600 },
      },
    )

    // Update cache
    logoDataCache = data
    cacheTimestamp = now

    return data
  } catch (error) {
    console.error("Error fetching logo data:", error)
    // Return cached data if available, even if expired
    return logoDataCache || null
  }
}

// Function to preload and cache logo data
export async function preloadLogoData() {
  return await getLogoData()
}
