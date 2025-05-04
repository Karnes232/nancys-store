"use client"
import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-fade"

import { Autoplay, EffectFade } from "swiper/modules"
import Image from "next/image"

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import NextImageLightbox from "../NextImageLightbox/NextImageLightbox"

type ProductCardSwiperProps = {
  images: {
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
  landscapeImages: {
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
  swiperClassName?: string
  lightbox?: boolean
}

const ProductCardSwiper = ({
  images,
  landscapeImages,
  swiperClassName,
  lightbox,
}: ProductCardSwiperProps) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(-1)
  let photoListEdited = []
  images.forEach(image => {
    photoListEdited.push({
      src: image.image.url,
      alt: image.alt,
      width: image.image.metadata.dimensions.width,
      height: image.image.metadata.dimensions.height,
    })
  })
  landscapeImages.forEach(image => {
    photoListEdited.push({
      src: image.image.url,
      alt: image.alt,
      width: image.image.metadata.dimensions.width,
      height: image.image.metadata.dimensions.height,
    })
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
              onClick={() => (lightbox ? setIndex(index) : undefined)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={400}
                className={`w-full object-cover ${swiperClassName}`}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      {lightbox && (
        <Lightbox
          slides={photoListEdited}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          render={{ slide: NextImageLightbox }}
        />
      )}
    </div>
  )
}

export default ProductCardSwiper
