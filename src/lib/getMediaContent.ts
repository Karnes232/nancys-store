import { client } from "@/sanity/lib/client"

const getMediaContent = async () => {
  try {
    const titles = ["Effect Shape Black", "Effect Shape White"]

    const query = `*[_type == "media" && title in $titles] {
      _id,
      title,
      "imageUrl": image.asset->url,
      "alt": image.alt
    }`

    const result = await client.fetch(query, { titles })
    return result
  } catch (error) {
    console.error("Error fetching from Sanity:", error)
    throw error
  }
}

export { getMediaContent }
