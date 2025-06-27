// structure.ts
import type { StructureBuilder } from "sanity/structure"

export const myStructure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Pages group
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.documentTypeListItem("page").title("Pages"),
              S.documentTypeListItem("generalLayout").title("General Layout"),
              S.documentTypeListItem("gallery").title("Photo Gallery"),
            ]),
        ),

      // Products group
      S.listItem()
        .title("Products")
        .child(
          S.list()
            .title("Products")
            .items([
              S.documentTypeListItem("product").title("Products"),
              S.documentTypeListItem("productCategory").title(
                "Product Categories",
              ),
            ]),
        ),

      S.listItem()
        .title("Media")
        .child(
          S.list()
            .title("Media")
            .items([
              S.documentTypeListItem("media").title("Media"),
              S.documentTypeListItem("effectShape").title("Effect Shape"),
            ]),
        ),

      // Object types group (optional - for reference)
      S.listItem()
        .title("Schema Types")
        .child(
          S.list()
            .title("Schema Types")
            .items([
              //   S.documentTypeListItem('blockContentType').title('Block Content'),
              //   S.documentTypeListItem('imageType').title('Images'),
              S.documentTypeListItem("localeString").title("Localized Strings"),
              S.documentTypeListItem("localeBlockContent").title(
                "Localized Content Blocks",
              ),
            ]),
        ),
    ])
