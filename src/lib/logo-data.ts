import { client } from "@/sanity/lib/client"

export async function getLogoData() {
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
    `)

    return data
  } catch (error) {
    console.error('Error fetching logo data:', error)
    return null
  }
}

// Function to preload logo data (can be called during build time)
export async function preloadLogoData() {
  return await getLogoData()
} 