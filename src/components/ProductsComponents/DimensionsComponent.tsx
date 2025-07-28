"use client"
import useTranslations from "@/i18n/useTranslations"
import React from "react"
import { Playfair_Display } from "next/font/google"
import * as motion from "motion/react-client"
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
})
const DimensionsComponent = ({
  dimensions,
  lang,
}: {
  dimensions: any
  lang: string
}) => {
  const t = useTranslations(lang)
  console.log(dimensions)
  return (
    <div>
      <h2
        className={`text-center text-gray-700 dark:text-white my-5 2xl:mb-2 2xl:mt-10 text-2xl md:text-3xl  ${playfairDisplay.className} mb-4 mt-8`}
      >
        {t("dimensions.title")}
      </h2>
      <div className="flex flex-col gap-2 justify-center items-center">
      <ul className="mt-xl mx-5 text-lg flex flex-col gap-2 justify-center items-start w-64 md:w-[80%] xl:w-[75%] 2xl:w-[70%]">
        <motion.li
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          style={{ listStyleType: "disc" }}
          className={`${playfairDisplay.className} lg:text-lg`}
        >
          {t("dimensions.height")}: {dimensions.height} cm
        </motion.li>
        <motion.li
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          style={{ listStyleType: "disc" }}
          className={`${playfairDisplay.className} lg:text-lg`}
        >
          {t("dimensions.width")}: {dimensions.width} cm
        </motion.li>
        <motion.li
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          style={{ listStyleType: "disc" }}
          className={`${playfairDisplay.className} lg:text-lg`}
        >
            {t("dimensions.weight")}: {dimensions.weight} g
          </motion.li>
        </ul>
      </div>
    </div>
  )
}

export default DimensionsComponent
