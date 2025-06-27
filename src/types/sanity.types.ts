export interface PageData {
  title: string
  heroImages: Array<{
    _key: string
    _type: "image"
    asset: {
      _ref: string
      _type: "reference"
    }
    alt: string
  }>
  heroImagesLandScape: Array<{
    _key: string
    _type: "image"
    asset: {
      _ref: string
      _type: "reference"
    }
    alt: string
  }>
  heroHeading: { en: string; es: string }
  heroSubheading?: { en: string; es: string }
  content?: Array<{
    _type: string
    [key: string]: unknown
  }>
  seo?: {
    metaTitle?: { en: string; es: string }
    metaDescription?: { en: string; es: string }
    keywords?: { en: string[]; es: string[] }
    openGraphImage?: {
      asset: {
        _ref: string
      }
    }
  }
}

export type LocaleBlockContent = Array<{
  _type: string
  _key: string
  children: Array<{
    _type: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _type: string
    _key: string
    href?: string
  }>
  style?: string
}>

export interface EffectShapeData {
  title: string
  effectShapeWhite: string
  effectShapeBlack: string
}
