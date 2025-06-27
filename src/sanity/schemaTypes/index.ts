import { type SchemaTypeDefinition } from "sanity"

import { blockContentType } from "./blockContentType"
import generalLayout from "./generalLayout"
import page from "./page"
import imageType from "./imageType"
import { localeString } from "./localeStringType"
import localeBlockContent from "./localeBlockContent"
import productCategory from "./productCategory"
import product from "./product"
import localeArray from "./localeArray"
import gallery from "./gallery"
import effectShape from "./effectShape"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    generalLayout,
    page,
    imageType,
    localeString,
    localeArray,
    localeBlockContent,
    productCategory,
    product,
    gallery,
    effectShape,
  ],
}
