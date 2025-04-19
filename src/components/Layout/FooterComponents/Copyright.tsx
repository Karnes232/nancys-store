"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"

const Copyright = ({ companyName }: { companyName: string }) => {
  const [date, setDate] = useState(undefined)
  useEffect(() => {
    setDate(new Date().getFullYear())
  }, [])
  return (
    <div className=" flex flex-col justify-between py-4">
      <Link href="/">
        <p className="tracking-wider cursor-pointer text-gray-400">
          All content Copyright &copy; {date} {companyName}
        </p>
      </Link>
    </div>
  )
}

export default Copyright
