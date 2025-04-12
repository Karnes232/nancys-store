import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-fade"
import { Autoplay, EffectFade } from "swiper/modules"
import Image from "next/image"
type ProductCardSwiperProps = {
  images: {
    image: {
      _ref: string
      url: string
    }
    alt: string
  }[]
  mainImage: {
    asset: {
      _ref: string
      url: string
    }
    alt: string
  }
}

const ProductCardSwiper = ({ images, mainImage }: ProductCardSwiperProps) => {
  let photoListEdited = [{ url: mainImage.asset.url, alt: mainImage.alt }]
  images.forEach(image => {
    photoListEdited.push({ url: image.image.url, alt: image.alt })
  })

  return (
    <div>
      <Swiper
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        className={`mySwiper`}
      >
        {photoListEdited.map((image, index) => {
          return (
            <SwiperSlide
              className={`w-full object-cover h-64 lg:h-60`}
              key={index}
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={400}
                height={400}
                className={`w-full object-cover h-64 lg:h-60`}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default ProductCardSwiper
