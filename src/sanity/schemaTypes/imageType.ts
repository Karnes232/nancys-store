import { defineField, defineType } from "sanity"

export default defineType({
  name: "media",
  title: "Media",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Image Title",
      type: "string",
      validation: Rule => Rule.required(),
      description: "Image Title",
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: Rule => Rule.required(),
          description: "Important for SEO and accessibility",
        }),
      ],
      description: "Images",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image.0",
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      }
    },
  },
})
