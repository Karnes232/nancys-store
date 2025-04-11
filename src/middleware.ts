import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { languages, fallbackLng } from "@/i18n/settings"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Special case for root path
  if (pathname === "/") {
    const headers = new Headers(request.headers)
    headers.set("x-locale", fallbackLng)
    return NextResponse.next({
      request: { headers },
    })
  }

  // Get the first path segment
  const firstSegment = pathname.split("/")[1]

  // Handle non-default language paths
  if (languages.includes(firstSegment)) {
    // If it's English (default language), redirect to path without /en
    if (firstSegment === fallbackLng) {
      const newPathname = pathname.replace(`/${fallbackLng}`, "") || "/"
      return NextResponse.redirect(new URL(newPathname, request.url))
    }

    // For other languages, continue with the language prefix
    const headers = new Headers(request.headers)
    headers.set("x-locale", firstSegment)
    return NextResponse.next({
      request: { headers },
    })
  }

  // If path doesn't start with a language code, assume it's English
  const headers = new Headers(request.headers)
  headers.set("x-locale", fallbackLng)
  return NextResponse.next({
    request: { headers },
  })
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
