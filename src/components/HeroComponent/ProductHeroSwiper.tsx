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
  mainImage,
}: {
  images: any
  mainImage: any
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

  let photoListEdited = [{ title: mainImage.alt, image: mainImage.asset.url }]
  images.forEach((image: any) => {
    photoListEdited.push({ title: image.alt, image: image.image.url })
  })
  let HeroStyles = {
    backgroundImage:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8))",
  }

  const height = "h-[70vh]"
  const blankDivHeight = "h-[73vh] lg:h-[80vh] xl:h-[85vh]"
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
          className={`mySwiper`}
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
               <div className="absolute inset-0" style={HeroStyles}>
                 {/* <div
                  className={`relative max-w-xs lg:max-w-4xl inline-block z-10 top-[60%] md:top-[70%] xl:top-[60%] left-1/2 transform -translate-x-1/2  text-center ${translatePosition}`}
                >
                  {heroHeading && (
                    <TextComponentHeading
                      heading={heroHeading}
                      headingNumber="h1"
                      HeadingClassName={`${playfairDisplay.className} text-white tracking-wider text-4xl md:text-5xl lg:text-6xl text-center 2xl:mb-0 2xl:mt-0`}
                    />
                  )}
                  {heroSubheading && (
                    <TextComponentHeading
                      heading={heroSubheading}
                      headingNumber="h2"
                      HeadingClassName={`${playfairDisplay.className} text-white tracking-wider text-xl md:text-2xl lg:text-3xl 2xl:mb-2 2xl:mt-5!`}
                    />
                  )}
                </div>*/}
              </div> 
              </SwiperSlide>
            )
          })}
          {effectShapeWhite.imageUrl && (
            <Image
              src={effectShapeWhite.imageUrl}
              alt={effectShapeWhite.alt}
              width={1000}
              height={1000}
              className={`z-50 !absolute -bottom-[1px] w-screen dark:hidden`}
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
