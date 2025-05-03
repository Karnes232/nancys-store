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
      description: "Title of the page for internal reference, DO NOT CHANGE",
      readOnly: ({ document }) => {
        // If the document exists (has an _id) and title is already set, make it read-only
        return Boolean(document?._id && document?.title)
      },
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        // Disable slug auto-generation once it's set
        isUnique: (slug, context) => {
          // This prevents the "Generate" button from appearing if slug exists
          if (
            context.document?._id &&
            (context.document?.slug as { current?: string })?.current
          ) {
            return Promise.resolve(true)
          }
          return context.defaultIsUnique(slug, context)
        },
      },
      validation: Rule => Rule.required(),
      description: 'The URL path for this page (e.g., "about-us")',
      readOnly: ({ document }) => {
        // If the document exists and slug is already set, make it read-only
        return Boolean(
          document?._id && (document?.slug as { current?: string })?.current,
        )
      },
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
          ],
        },
      ],
      description: "Images to display in the hero section in portrait mode",
    }),
    defineField({
      name: "heroImagesLandScape",
      title: "Hero Images LandScape",
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
          ],
        },
      ],
      description: "Images to display in the hero section in landscape mode",
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
      type: "localeString",
      description: "Optional subheading text for the hero section",
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
