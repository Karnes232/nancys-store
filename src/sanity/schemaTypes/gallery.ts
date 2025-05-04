import { defineField, defineType } from "sanity"
import { ImageIcon } from "@sanity/icons"
export default defineType({
  name: "gallery",
  title: "Photo Gallery",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Gallery Title",
      type: "localeString",
      validation: Rule => Rule.required(),
      description: "Name of the photo gallery",
    }),

    defineField({
      name: "description",
      title: "Gallery Description",
      type: "localeString",
      description: "A brief description of the photo gallery",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
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
      description: "This image will be used as the gallery cover/thumbnail",
    }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [
        {
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
            defineField({
              name: "caption",
              title: "Caption",
              type: "localeString",
              description: "Optional caption for the image",
            }),
          ],
        },
      ],
      validation: Rule => Rule.required().min(1),
      description: "Add images to the gallery",
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
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "title.es",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle,
        media,
      }
    },
  },
})
