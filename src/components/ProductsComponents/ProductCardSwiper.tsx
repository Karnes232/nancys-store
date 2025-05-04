"use client"
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
  landscapeImages: {
    image: {
      _ref: string
      url: string
    }
    alt: string
  }[]
  swiperClassName?: string
}

const ProductCardSwiper = ({
  images,
  landscapeImages,
  swiperClassName,
}: ProductCardSwiperProps) => {
  let photoListEdited = []
  images.forEach(image => {
    photoListEdited.push({ url: image.image.url, alt: image.alt })
  })
  landscapeImages.forEach(image => {
    photoListEdited.push({ url: image.image.url, alt: image.alt })
  })

  return (
    <div>
      <Swiper
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        className={`mySwiper`}
        fadeEffect={{ crossFade: true }}
      >
        {photoListEdited.map((image, index) => {
          return (
            <SwiperSlide
              className={`w-full object-cover ${swiperClassName} rounded-t-lg overflow-hidden [&:not(.swiper-slide-active)]:opacity-0!`}
              key={index}
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={400}
                height={400}
                className={`w-full object-cover ${swiperClassName}`}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default ProductCardSwiper
