"use client"
import useTranslations from "@/i18n/useTranslations"
import { useSearchParams } from "next/navigation"
import React, { Suspense } from "react"

const ThankYouContent = ({ email, lang }: { email: string; lang: string }) => {
  const t = useTranslations(lang)
  const searchParams = useSearchParams()
  const name = searchParams.get("name")

  return (
    <div className="flex flex-col items-center justify-center max-w-xs xl:max-w-sm mx-auto min-h-[40vh] xl:min-h-[50vh]">
      <div className="mb-10">
        <div className="flex flex-col justify-center items-center text-slate-600 ">
          <div className="text-2xl xl:text-4xl font-serif text-center mt-6">
            {t("ThankYouPage.thank_you_message1")} {name},{" "}
            {t("ThankYouPage.thank_you_message2")}
          </div>

          <div className="text-center text-sm xl:text-base mt-2 xl:mt-6">
            {t("ThankYouPage.contact_follow_up")}{" "}
            <a
              href={`mailto:${email}`}
              aria-label="Gmail"
              rel="noreferrer"
              className="underline"
            >
              {t("ThankYouPage.contact_us")}
            </a>{" "}
            {t("ThankYouPage.with_questions")}
          </div>
        </div>
      </div>
    </div>
  )
}

const ThankYou = (props: { email: string; lang: string }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouContent {...props} />
    </Suspense>
  )
}

export default ThankYou
