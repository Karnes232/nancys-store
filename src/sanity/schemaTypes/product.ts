// product.ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "object",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "string",
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: "es",
          title: "Spanish",
          type: "string",
          validation: Rule => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name.en",
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      description: 'The URL path for this page (e.g., "about-us")',
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "productCategory" }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: Rule => Rule.required().precision(2),
    }),

    defineField({
      name: "imagesList",
      title: "Images Portrait",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              type: "image",
              title: "Image",
              options: { hotspot: true },
            }),
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
              validation: Rule => Rule.required(),
              description: "Important for SEO and accessibility",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "imagesListLandscape",
      title: "Images Landscape",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              type: "image",
              title: "Image",
              options: { hotspot: true },
            }),
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
              validation: Rule => Rule.required(),
              description: "Important for SEO and accessibility",
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "localeString",
    }),
    defineField({
      name: "content",
      title: "Page Content",
      type: "localeBlockContent",
      description: "Main content of the page",
    }),
    defineField({
      name: "seo",
      title: "SEO & Metadata",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "localeString",
          description: "Title used for search engines and browser tabs",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "localeString",
          description: "Description for search engines",
        }),
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "localeArray",
          description: "Keywords for search engines (comma-separated)",
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: "openGraphImage",
          title: "Open Graph Image",
          type: "image",
          description:
            "Image for sharing on social media (Facebook, Twitter, etc.)",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "name.es",
      media: "mainImage",
    },
  },
})
