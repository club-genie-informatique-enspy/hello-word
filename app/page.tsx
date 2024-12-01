import HomeContent from "./HomeContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Open Blog",
  description: "Ce site est une plateforme de blogue. Vous pouvez voir les articles les plus recents.",
};



export default function Home() {

  return (
    <>
      <HomeContent />
    </>
  )
}