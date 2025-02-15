import HomePage from "./v2/page"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Hello World",
  description: "Ce site est une plateforme de blogue. Vous pouvez voir les articles les plus recents.",
};



export default function Home() {

  return (
    <>
      <HomePage />
    </>
  )
}