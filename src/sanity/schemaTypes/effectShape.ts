import { defineField, defineType } from "sanity"
import { ImageIcon } from "@sanity/icons"
export default defineType({
  name: "effectShape",
  title: "Effect Shape",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Effect Shape Title",
      type: "string",
      validation: Rule => Rule.required(),
      description: "Name of the effect shape",
    }),

    defineField({
      name: "effectShapeWhite",
      title: "Effect Shape White",
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
      validation: Rule => Rule.required(),
      description: "This image will be used as the effect shape white",
    }),
    defineField({
      name: "effectShapeBlack",
      title: "Effect Shape Black",
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
      validation: Rule => Rule.required(),
      description: "This image will be used as the effect shape black",
    }),
   
  ],
  preview: {
    select: {
      title: "title",
      media: "effectShapeWhite",
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      }
    },
  },
})
