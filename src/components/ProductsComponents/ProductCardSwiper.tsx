"use client"
import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-fade"

import { Autoplay, EffectFade } from "swiper/modules"
import Image from "next/image" // Make sure this import is correct

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import NextImageLightbox from "../NextImageLightbox/NextImageLightbox" // Adjust path if necessary
import { urlFor } from "@/sanity/lib/image"

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
  let photoListEdited: {
    src: string
    alt: string
    width: number
    height: number
  }[] = []

  // It's generally better to combine these into a single list if they are all displayed in one swiper
  // Also, consider which set of images (images vs landscapeImages) you want to prioritize
  // based on screen size, similar to your HeroSwiper
  images.forEach(image => {
    const url = urlFor(image.image).width(400).height(300).url()
    photoListEdited.push({
      src: url,
      alt: image.alt,
      width: image.image.metadata.dimensions.width,
      height: image.image.metadata.dimensions.height,
    })
  })
  landscapeImages.forEach(image => {
    const url = urlFor(image.image).width(400).height(300).url()
    photoListEdited.push({
      src: url,
      alt: image.alt,
      width: image.image.metadata.dimensions.width,
      height: image.image.metadata.dimensions.height,
    })
  })

  // You might want to decide which photoList to use based on screen width,
  // similar to how you did with heroImages and heroImagesLandScape in HeroSwiper.
  // For simplicity, I'll use photoListEdited as is, assuming it's the combined list.

  return (
    <div>
      <Swiper
        effect={"fade"}
        loop={true} // Be mindful of `loop={true}` with `priority={true}`.
        // If the Swiper jumps to a "cloned" slide, that clone might also load eagerly.
        // For typical performance, keep priority on the *first actual* slide.
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        className={`mySwiper`}
        fadeEffect={{ crossFade: true }}
      >
        {photoListEdited.map((image, index) => {
          const isFirstSlide = index === 0 // Identify the first image in the array

          return (
            <SwiperSlide
              className={`w-full object-cover ${swiperClassName} rounded-t-lg overflow-hidden [&:not(.swiper-slide-active)]:opacity-0!`}
              key={index}
              onClick={() => (lightbox ? setIndex(index) : undefined)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width} // Use actual image dimensions from metadata for better optimization
                height={image.height} // Use actual image dimensions from metadata
                className={`w-full object-cover ${swiperClassName}`}
                priority={false} 
                loading="lazy"
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
