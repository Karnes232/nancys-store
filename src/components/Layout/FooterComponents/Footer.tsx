import LanguageSwitcher from "@/components/LanguageSwitcher"
import { FaInstagram } from "react-icons/fa"
import { client } from "@/sanity/lib/client"
import React from "react"
import SiteMap from "./SiteMap"
import SocialMedia from "./SocialMedia"
import Copyright from "./Copyright"

const Footer = async () => {
  const data = await client.fetch(`
    *[_type == "generalLayout"][0] {
      logo,
      companyName,
      instagram,
      telephone,
      email
    }
  `)

  if (!data) return null
  console.log(data.instagram)
  const instatag = data.instagram.split("/")[3]
  console.log(instatag)
  return (
    <div className="flex flex-col xl:max-w-6xl xl:w-full xl:mx-auto justify-between py-10 mx-8 md:mx-10">
      <div className="flex justify-center items-center">
        <a
          href={data.instagram}
          target="_blank"
          aria-label="Instagram"
          rel="noreferrer"
          className="flex flex-row items-center justify-center space-x-2 text-gray-400"
        >
          <FaInstagram className="text-2xl" />{" "}
          <p className="uppercase text-sm tracking-widest">@{instatag}</p>
        </a>
      </div>
      <div className="flex flex-col lg:flex-row justify-between lg:items-center space-y-10 lg:space-y-0">
        <div className="my-5 lg:my-10">
          <SiteMap />
        </div>
        <LanguageSwitcher />
        <SocialMedia
          instagram={data.instagram}
          email={data.email}
          telephone={data.telephone}
        />
      </div>
      <Copyright companyName={data.companyName} />
    </div>
  )
}

export default Footer
