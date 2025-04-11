"use client"
import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Playfair_Display } from "next/font/google"
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

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const HeroSwiper = ({
  heroImages,
  heroHeading,
  heroSubheading,
  className,
}: {
  heroImages: any
  heroHeading: string
  heroSubheading: string
  className: string
}) => {
  const [mediaItems, setMediaItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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
      const media = await getMediaContent()
      media.forEach((item: any) => {
        if (item.title === "Effect Shape Black") {
          setEffectShapeBlack(item)
        } else if (item.title === "Effect Shape White") {
          setEffectShapeWhite(item)
        }
      })
      setMediaItems(media)
      setIsLoading(false)
    }
    fetchMediaItems()
  }, [])

  const photoListEdited = heroImages.map((image: any) => {
    return {
      title: image.alt,
      image: image.asset.url,
    }
  })
  let HeroStyles = {
    backgroundImage:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2))",
  }

  const height = "h-screen"
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
          className={`mySwiper  ${className}`}
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
                  <div
                    className={`relative max-w-xs lg:max-w-4xl inline-block z-10 top-[60%] md:top-[70%] lg:top-[70%] left-1/2 transform -translate-x-1/2  text-center ${translatePosition}`}
                  >
                    {heroHeading && (
                      <h1
                        translate="no"
                        className={`${playfairDisplay.className} text-white tracking-wider text-4xl md:text-5xl lg:text-6xl text-center `}
                      >
                        {heroHeading}
                      </h1>
                    )}
                    {heroSubheading && (
                      <h2
                        translate="no"
                        className={`${playfairDisplay.className} text-white tracking-wider text-xl md:text-2xl lg:text-3xl mt-5`}
                      >
                        {heroSubheading}
                      </h2>
                    )}
                  </div>
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

      <div className={`${height}`}></div>
    </>
  )
}

export default HeroSwiper
