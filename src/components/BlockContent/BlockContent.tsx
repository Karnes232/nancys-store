import { client } from "@/sanity/lib/client"
import { PortableText } from "@portabletext/react"
import imageUrlBuilder from "@sanity/image-url"
interface LocaleBlockContent {
  _type: string
  en: any[]
  es: any[]
}

interface Props {
  content: LocaleBlockContent
  language?: "en" | "es"
}
const builder = imageUrlBuilder(client)
const components = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = builder.image(value).url()
      console.log(value)
      // Sanity images usually need to be accessed via .asset.url

      return (
        <figure className="my-8">
          <img
            src={imageUrl}
            alt={value.alt || ""}
            loading="lazy"
            className="w-full rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-600">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      return (
        <a
          href={value.href}
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      )
    },
  },
  block: {
    normal: ({ children }: any) => <p className="mb-4">{children}</p>,
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mb-4 mt-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mb-3 mt-6">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mb-3 mt-6">{children}</h3>
    ),
  },
}

const BlockContent: React.FC<Props> = ({ content, language = "en" }) => {
  if (!content || !content[language]) {
    return null
  }
  const blockContent = content[language][language]
  console.log("BlockContent received:", { content, language })
  return <PortableText value={blockContent} components={components} />
}

export default BlockContent
