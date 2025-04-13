export type Category = {
  _id: string
  name: {
    en: string
    es: string
  }
}

export interface Product {
  _id: string
  name: {
    en: string
    es: string
  }
  slug: {
    current: string
  }
  price: number
  category: Category
  mainImage: {
    asset: {
      _ref: string
      url: string
    }
    alt: string
  }
  imagesList: {
    image: {
      _ref: string
      url: string
    }
    alt: string
  }[]
  shortDescription: {
    en: string
    es: string
  }
}
