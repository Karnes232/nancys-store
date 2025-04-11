import { type SchemaTypeDefinition } from "sanity"

import { blockContentType } from "./blockContentType"
import generalLayout from "./generalLayout"
import page from "./page"
import imageType from "./imageType"
import { localeString } from "./localeStringType"
import localeBlockContent from "./localeBlockContent"
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    generalLayout,
    page,
    imageType,
    localeString,
    localeBlockContent,
  ],
}
