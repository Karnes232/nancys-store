import React from "react"

interface TextComponentListProps {
  listItem: React.ReactNode
  ListItemClassName?: string
  listType: "bullet" | "number"
}

const TextComponentList: React.FC<TextComponentListProps> = ({
  listItem,
  ListItemClassName = "",
  listType,
}) => {
  const baseClasses = "flex items-start gap-2"
  const combinedClasses = `${baseClasses} ${ListItemClassName}`.trim()

  return (
    <li className={combinedClasses}>
      <span className="flex-shrink-0 mt-1">
        {listType === "bullet" ? (
          <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
        ) : (
          <span className="text-gray-600 font-medium">•</span>
        )}
      </span>
      <span className="flex-1">{listItem}</span>
    </li>
  )
}

export default TextComponentList
