import { client } from "@/sanity/lib/client"
import { PortableText } from "@portabletext/react"
import imageUrlBuilder from "@sanity/image-url"
import TextComponentParagraph from "./TextComponentParagraph"
import TextComponentHeading from "./TextComponentHeading"
import Image from "next/image"
import { PortableTextComponentProps } from "@portabletext/react"
import {
  ToolkitPortableTextList,
  ToolkitPortableTextListItem,
} from "@portabletext/toolkit"
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

      // Sanity images usually need to be accessed via .asset.url

      return (
        <figure className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || ""}
            width={1000}
            height={1000}
            className="w-full rounded-lg"
          />
          {/* <img
            src={imageUrl}
            alt={value.alt || ""}
            loading="lazy"
            className="w-full rounded-lg"
          /> */}
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
  list: {
    bullet: ({
      children,
    }: PortableTextComponentProps<ToolkitPortableTextList>) => (
      <ul className="mb-4 ml-4 space-y-2">{children}</ul>
    ),
    number: ({
      children,
    }: PortableTextComponentProps<ToolkitPortableTextList>) => (
      <ol className="mb-4 ml-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({
      children,
    }: PortableTextComponentProps<ToolkitPortableTextListItem>) => (
      <li className="mb-2 ml-4 flex items-start gap-2">
        <span className="flex-shrink-0 mt-1">
          <span className="w-3 h-3 bg-black rounded-full block"></span>
        </span>
        <span className="flex-1">{children}</span>
      </li>
    ),
    number: ({
      children,
    }: PortableTextComponentProps<ToolkitPortableTextListItem>) => (
      <li className="mb-2 ml-4 flex items-start gap-2">
        <span className="flex-shrink-0 mt-1">
          <span className="text-black font-bold text-lg">•</span>
        </span>
        <span className="flex-1">{children}</span>
      </li>
    ),
  },
  block: {
    // normal: ({ children }: any) => <p className="mb-4">{children}</p>,
    normal: ({ children }: any) => (
      <TextComponentParagraph paragraph={children} ParagraphClassName="mb-4" />
    ),
    h1: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h1"
        HeadingClassName="mb-4 mt-8"
      />
    ),
    h2: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h2"
        HeadingClassName="mb-4 mt-8"
      />
    ),
    h3: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h3"
        HeadingClassName="mb-4 mt-8"
      />
    ),
    h4: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h4"
        HeadingClassName="mb-4 mt-8"
      />
    ),
    h5: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h5"
        HeadingClassName="mb-4 mt-8"
      />
    ),
    h6: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h6"
        HeadingClassName="mb-4 mt-8"
      />
    ),
  },
}

const BlockContent: React.FC<Props> = ({ content, language = "en" }) => {
  if (!content || !content[language]) {
    return null
  }
  const blockContent = content[language][language]

  return (
    <>
      <div className="flex flex-col max-w-5xl mx-5 lg:p-2 lg:mx-auto">
        <PortableText value={blockContent} components={components} />
      </div>
    </>
  )
}

export default BlockContent
