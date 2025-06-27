"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"
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

const HeroSwiperOptimized: React.FC<{
  heroImages: any
  heroImagesLandScape: any
  heroHeading: string
  heroSubheading: string
  className: string
  effectShapeBlack: any
  effectShapeWhite: any
}> = ({
  heroImages,
  heroImagesLandScape,
  heroHeading,
  heroSubheading,
  className,
  effectShapeBlack,
  effectShapeWhite,
}) => {
  const [showAllSlides, setShowAllSlides] = useState(false)
  console.log(effectShapeBlack, effectShapeWhite)
  // const [effectShapeBlack, setEffectShapeBlack] = useState({
  //   imageUrl: "",
  //   alt: "",
  // })
  // const [effectShapeWhite, setEffectShapeWhite] = useState({
  //   imageUrl: "",
  //   alt: "",
  // })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAllSlides(true)
    }, 3000) // Delay of 3 seconds; tweak as needed
    return () => clearTimeout(timeout)
  }, [])

  // useEffect(() => {
  //   const fetchMediaItems = async () => {
  //     try {
  //       const media = await getMediaContent()
  //       media.forEach((item: any) => {
  //         if (item.title === "Effect Shape Black") {
  //           setEffectShapeBlack(item)
  //         } else if (item.title === "Effect Shape White") {
  //           setEffectShapeWhite(item)
  //         }
  //       })
  //     } catch (error) {
  //       console.error("Error fetching media items:", error)
  //     }
  //   }
  //   fetchMediaItems()
  // }, [])

  // Combine images with responsive sources
  const combinedImages = heroImages.map((image: any, index: any) => {
    const landscapeImage = heroImagesLandScape[index] || image
    return {
      title: image.alt,
      mobileImage: image.asset.url,
      desktopImage: landscapeImage.asset.url,
    }
  })

  let HeroStyles = {
    backgroundImage:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2))",
  }

  const height = "h-screen"
  const blankDivHeight = "h-[73vh] lg:h-[80vh] xl:h-[85vh] 2xl:h-[90vh]"
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
          className={`mySwiper ${className}`}
        >
          {combinedImages.map((image: any, index: any) => {
            const isFirstSlide = index === 0
            if (!showAllSlides && !isFirstSlide) return null //
            return (
              <SwiperSlide
                className={`relative w-full object-cover object-center ${height}`}
                key={index}
              >
                {/* Mobile Image */}
                <Image
                  src={image.mobileImage}
                  alt={image.title}
                  width={500}
                  height={1000}
                  className={`w-full object-cover object-center ${height} lg:hidden`}
                  priority={isFirstSlide}
                  loading={isFirstSlide ? "eager" : "lazy"}
                  quality={85}
                  sizes="100vw"
                />

                {/* Desktop Image */}
                <Image
                  src={image.desktopImage}
                  alt={image.title}
                  width={1500}
                  height={1000}
                  className={`w-full object-cover object-center ${height} hidden lg:block`}
                  priority={isFirstSlide}
                  loading={isFirstSlide ? "eager" : "lazy"}
                  quality={85}
                  sizes="(min-width: 1024px) 100vw"
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

          {/* Effect Images */}
          {effectShapeWhite.asset.url && (
            <div className="dark:hidden">
              <Image
                src={effectShapeWhite.asset.url}
                alt='effect shape white'
                width={500}
                height={200}
                className={`z-50 !absolute -bottom-[1px] w-screen dark:hidden lg:hidden`}
                quality={50}
                sizes="100vw"
              />
              <Image
                src={effectShapeWhite.asset.url}
                alt='effect shape white'
                width={1500}
                height={200}
                className={`z-50 !absolute -bottom-[1px] w-screen dark:hidden hidden lg:block`}
                quality={85}
                sizes="(min-width: 1024px) 100vw"
              />
            </div>
          )}
          
          {effectShapeBlack.asset.url && (
            <div className="hidden dark:block">
              <Image
                src={effectShapeBlack.asset.url}
                alt='effect shape black'
                width={500}
                height={200}
                className={`z-50 !absolute -bottom-[1px] w-screen hidden lg:hidden`}
                quality={50}
                sizes="100vw"
              />
              <Image
                src={effectShapeBlack.asset.url}
                alt='effect shape black'
                width={1500}
                height={200}
                className={`z-50 !absolute -bottom-[1px] w-screen hidden lg:block`}
                quality={85}
                sizes="(min-width: 1024px) 100vw"
              />
            </div>
          )}
        </Swiper>
      </div>

      <div className={`${blankDivHeight}`}></div>
    </>
  )
}

export default HeroSwiperOptimized
