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
  imagesList: {
    image: {
      _ref: string
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }[]
  imagesListLandscape: {
    image: {
      _ref: string
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }[]
  shortDescription: {
    en: string
    es: string
  }
}
