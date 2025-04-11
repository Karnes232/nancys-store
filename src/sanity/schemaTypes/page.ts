// schemas/page.ts
import { defineField, defineType } from "sanity"

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: Rule => Rule.required(),
      description: "Title of the page for internal reference",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      description: 'The URL path for this page (e.g., "about-us")',
    }),
    defineField({
      name: "heroImages",
      title: "Hero Images",
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
              type: "string",
              description: "Optional caption for the image",
            }),
          ],
        },
      ],
      description: "Images to display in the hero section",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "localeString",
      description: "Main heading text that appears in the hero section",
    }),

    defineField({
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "text",
      rows: 2,
      description: "Optional subheading text for the hero section",
    }),
    defineField({
      name: "content",
      title: "Page Content",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            // Decorators usually describe a single property – e.g. a typographic
            // preference or highlighting
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            // Annotations can be any object structure – e.g. a link or a footnote.
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
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
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
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
          type: "string",
          description: "Title used for search engines and browser tabs",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          description: "Description for search engines",
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
      title: "title",
      subtitle: "slug.current",
      media: "heroImages.0",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `/${subtitle}`,
        media,
      }
    },
  },
})
