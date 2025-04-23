import React from "react"
import { FaEnvelope, FaInstagram, FaWhatsapp } from "react-icons/fa"
const SocialMedia = ({
  instagram,
  email,
  telephone,
}: {
  instagram: string
  email: string
  telephone: string
}) => {
  return (
    <div className="flex flex-row gap-5">
      <a
        href={instagram}
        target="_blank"
        aria-label="Instagram"
        rel="noreferrer"
        className="space-x-2 text-gray-400"
      >
        <FaInstagram className="text-2xl" />{" "}
      </a>
      <a
        href={`mailto:${email}`}
        target="_blank"
        aria-label="Email"
        rel="noreferrer"
        className="space-x-2 text-gray-400"
      >
        <FaEnvelope className="text-2xl" />{" "}
      </a>
      <a
        href={`https://api.whatsapp.com/send?phone=${telephone}`}
        target="_blank"
        aria-label="Telephone"
        rel="noreferrer"
        className="space-x-2 text-gray-400"
      >
        <FaWhatsapp className="text-2xl" />{" "}
      </a>
    </div>
  )
}

export default SocialMedia
