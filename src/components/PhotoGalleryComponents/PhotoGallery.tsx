"use client"
import Image from "next/image"
import React, { useState } from "react"
import {
  MasonryPhotoAlbum,
  RenderImageContext,
  RenderImageProps,
} from "react-photo-album"
import "react-photo-album/masonry.css"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import NextImageLightbox from "../NextImageLightbox/NextImageLightbox"

function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        src={photo}
        alt={alt}
        title={title}
        sizes={sizes}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
        className="rounded-lg overflow-hidden"
      />
    </div>
  )
}

const PhotoGallery = ({ images }: { images: any }) => {
  const [index, setIndex] = useState(-1)
  let photoList = images.map((image: any) => {
    return {
      src: image.asset.url,
      width: image.asset.metadata.dimensions.width,
      height: image.asset.metadata.dimensions.height,
      caption: image.caption,
      alt: image.alt,
    }
  })

  return (
    <div className="w-full my-5 mx-auto px-2 xl:px-0 lg:max-w-6xl">
      <MasonryPhotoAlbum
        render={{ image: renderNextImage }}
        photos={photoList}
        columns={containerWidth => {
          if (containerWidth < 320) return 1
          if (containerWidth < 780) return 2
          if (containerWidth < 1024) return 3
          return 4
        }}
        onClick={({ index }) => setIndex(index)}
        spacing={8}
        padding={0}
      />
      <Lightbox
        slides={photoList}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        render={{ slide: NextImageLightbox }}
      />
    </div>
  )
}

export default PhotoGallery
