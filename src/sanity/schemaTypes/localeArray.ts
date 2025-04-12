import { defineType, defineField } from "sanity"

export default defineType({
  name: "localeArray",
  title: "Localized Array",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "string" }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "es",
      title: "Spanish",
      type: "array",
      of: [{ type: "string" }],
      validation: Rule => Rule.required(),
    }),
  ],
})
