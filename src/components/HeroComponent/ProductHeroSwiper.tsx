"use client"
import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-fade"
import { Autoplay, EffectFade } from "swiper/modules"
import Image from "next/image"
import { client } from "@/sanity/lib/client"

const getMediaContent = async () => {
  try {
    const titles = ["Effect Shape Black", "Effect Shape White"]

    const query = `*[_type == "media" && title in $titles] {
        _id,
        title,
        "imageUrl": image.asset->url,
        "alt": image.alt
      }`

    const result = await client.fetch(query, { titles })
    return result
  } catch (error) {
    console.error("Error fetching from Sanity:", error)
    throw error
  }
}

const ProductHeroSwiper = ({
  images,
  landscapeImages,
}: {
  images: any
  landscapeImages: any
}) => {
  const [effectShapeBlack, setEffectShapeBlack] = useState({
    imageUrl: "",
    alt: "",
  })
  const [effectShapeWhite, setEffectShapeWhite] = useState({
    imageUrl: "",
    alt: "",
  })
  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        const media = await getMediaContent()
        media.forEach((item: any) => {
          if (item.title === "Effect Shape Black") {
            setEffectShapeBlack(item)
          } else if (item.title === "Effect Shape White") {
            setEffectShapeWhite(item)
          }
        })
      } catch (error) {
        console.error("Error fetching media items:", error)
      }
    }
    fetchMediaItems()
  }, [])

  let photoListEdited = []
  let landscapePhotoListEdited = []
  images.forEach((image: any) => {
    photoListEdited.push({ title: image.alt, image: image.image.url })
  })
  landscapeImages.forEach((image: any) => {
    landscapePhotoListEdited.push({ title: image.alt, image: image.image.url })
  })
  let HeroStyles = {
    backgroundImage:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8))",
  }

  const height = "h-[70vh] xl:h-[69vh] 2xl:h-[70vh]"
  const blankDivHeight = "h-[43vh] lg:h-[65vh] xl:h-[65vh] 2xl:h-[65vh]"
  const translatePosition = "-translate-y-2/3"
  return (
    <>
      <div className={`absolute top-0 w-full ${height}`}>
        <Swiper
          effect={"fade"}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFade]}
          className={`mySwiper block! lg:hidden!`}
        >
          {photoListEdited.map((image: any, index: any) => {
            return (
              <SwiperSlide
                className={`relative w-full object-cover object-center ${height}`}
                key={index}
              >
                <Image
                  src={image.image}
                  alt={image.title}
                  width={1000}
                  height={1000}
                  className={`w-full object-cover object-center ${height}`}
                />
                <div className="absolute inset-0" style={HeroStyles}></div>
              </SwiperSlide>
            )
          })}
          {effectShapeWhite.imageUrl && (
            <Image
              src={effectShapeWhite.imageUrl}
              alt={effectShapeWhite.alt}
              width={1000}
              height={1000}
              className={`z-50 !absolute -bottom-[1px] xl:-bottom-[.2rem] 2xl:-bottom-[0.5rem] w-screen dark:hidden`}
            />
          )}
          {effectShapeBlack.imageUrl && (
            <Image
              src={effectShapeBlack.imageUrl}
              alt={effectShapeBlack.alt}
              width={1000}
              height={1000}
              className={`z-50 !absolute -bottom-[1px] w-screen dark:block hidden`}
            />
          )}
        </Swiper>
        <Swiper
          effect={"fade"}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFade]}
          className={`mySwiper hidden! lg:block!`}
        >
          {landscapePhotoListEdited.map((image: any, index: any) => {
            return (
              <SwiperSlide
                className={`relative w-full object-cover object-center ${height}`}
                key={index}
              >
                <Image
                  src={image.image}
                  alt={image.title}
                  width={1000}
                  height={1000}
                  className={`w-full object-cover object-center ${height}`}
                />
                <div className="absolute inset-0" style={HeroStyles}></div>
              </SwiperSlide>
            )
          })}
          {effectShapeWhite.imageUrl && (
            <Image
              src={effectShapeWhite.imageUrl}
              alt={effectShapeWhite.alt}
              width={1000}
              height={1000}
              className={`z-50 !absolute -bottom-[1px] xl:-bottom-[.2rem] 2xl:-bottom-[0.5rem] w-screen dark:hidden`}
            />
          )}
          {effectShapeBlack.imageUrl && (
            <Image
              src={effectShapeBlack.imageUrl}
              alt={effectShapeBlack.alt}
              width={1000}
              height={1000}
              className={`z-50 !absolute -bottom-[1px] w-screen dark:block hidden`}
            />
          )}
        </Swiper>
      </div>

      <div className={`${blankDivHeight}`}></div>
    </>
  )
}

export default ProductHeroSwiper
