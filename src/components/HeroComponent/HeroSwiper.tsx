"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"
//import TextComponentHeading from "../ProductsComponents/TextComponentHeading"
import { Playfair_Display } from "next/font/google"
import { getMediaContent } from "@/lib/getMediaContent"
import dynamicImport from "next/dynamic"

const TextComponentHeading = dynamicImport(
  () => import("@/components/BlockContent/TextComponentHeading"),
  {
    loading: () => <div>Loading...</div>,
  },
)

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

const HeroSwiper: React.FC<{
  heroImages: any
  heroImagesLandScape: any
  heroHeading: string
  heroSubheading: string
  className: string
}> = ({
  heroImages,
  heroImagesLandScape,
  heroHeading,
  heroSubheading,
  className,
}) => {
  const [effectShapeBlack, setEffectShapeBlack] = useState({
    imageUrl: "",
    alt: "",
  })
  const [effectShapeWhite, setEffectShapeWhite] = useState({
    imageUrl: "",
    alt: "",
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

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

  const photoListEdited = heroImages.map((image: any) => {
    return {
      title: image.alt,
      image: image.asset.url,
    }
  })

  const photoListEditedLandScape = heroImagesLandScape.map((image: any) => {
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
  const blankDivHeight = "h-[73vh] lg:h-[80vh] xl:h-[85vh] 2xl:h-[90vh]"
  const translatePosition = "-translate-y-2/3"

  // Only render the appropriate swiper based on screen size
  const renderSwiper = (isMobileView: boolean) => {
    const images = isMobileView ? photoListEdited : photoListEditedLandScape
    const imageWidth = isMobileView ? 500 : 1500
    const imageHeight = isMobileView ? 1000 : 1000
    const effectImageWidth = isMobileView ? 500 : 1500
    const effectImageHeight = 200
    const effectImageQuality = isMobileView ? 50 : 85

    return (
      <Swiper
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        className={`mySwiper ${className}`}
      >
        {images.map((image: any, index: any) => {
          return (
            <SwiperSlide
              className={`relative w-full object-cover object-center ${height}`}
              key={index}
            >
              <Image
                src={image.image}
                alt={image.title}
                width={imageWidth}
                height={imageHeight}
                className={`w-full object-cover object-center ${height}`}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                quality={85}
                sizes={isMobileView ? "100vw" : "(min-width: 1024px) 100vw"}
              />
              <div className="absolute inset-0" style={HeroStyles}>
                <div
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
                </div>
              </div>
            </SwiperSlide>
          )
        })}
        {effectShapeWhite.imageUrl && (
          <Image
            src={effectShapeWhite.imageUrl}
            alt={effectShapeWhite.alt}
            width={effectImageWidth}
            height={effectImageHeight}
            className={`z-50 !absolute -bottom-[1px] w-screen dark:hidden`}
            quality={effectImageQuality}
            sizes="100vw"
          />
        )}
        {effectShapeBlack.imageUrl && (
          <Image
            src={effectShapeBlack.imageUrl}
            alt={effectShapeBlack.alt}
            width={effectImageWidth}
            height={effectImageHeight}
            className={`z-50 !absolute -bottom-[1px] w-screen dark:block hidden`}
            quality={effectImageQuality}
            sizes="100vw"
          />
        )}
      </Swiper>
    )
  }

  return (
    <>
      <div className={`absolute top-0 w-full ${height}`}>
        {renderSwiper(isMobile)}
      </div>

      <div className={`${blankDivHeight}`}></div>
    </>
  )
}

export default HeroSwiper
