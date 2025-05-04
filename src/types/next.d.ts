// types/next.d.ts
import { ParsedUrlQuery } from "querystring"

declare module "next" {
  export interface PageProps {
    params: {
      [key: string]: string
    }
  }
}
