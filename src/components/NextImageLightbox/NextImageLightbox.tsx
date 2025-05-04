import Image from "next/image"
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox"

function isNextJsImage(slide) {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  )
}

export default function NextImageLightbox({ slide, offset, rect }) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps()
  const { currentIndex } = useLightboxState()

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit)

  if (!isNextJsImage(slide)) return undefined

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width),
      )
    : rect.width

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height),
      )
    : rect.height

  return (
    <div
      className="rounded-lg lg:rounded-3xl"
      style={{ position: "relative", width, height }}
    >
      <Image
        alt={slide.alt}
        src={slide.src}
        loading="eager"
        draggable={false}
        className="object-cover w-full h-full rounded-lg lg:rounded-3xl"
        fill
        quality={80}
      />
    </div>
  )
}
