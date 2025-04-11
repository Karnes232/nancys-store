import { defineType } from "sanity"

export default defineType({
  name: "localeBlockContent",
  title: "Localized Block Content",
  type: "object",
  fields: [
    {
      name: "en",
      title: "English",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
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
            {
              name: "alt",
              title: "Alternative Text",
              type: "string",
              validation: Rule => Rule.required(),
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
      ],
    },
    // Add other languages as needed
    {
      name: "es",
      title: "Spanish",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
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
            {
              name: "alt",
              title: "Alternative Text",
              type: "string",
              validation: Rule => Rule.required(),
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
})
