import { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [new URL("https://robohash.org/*?size=50x50")]
  }
}

export default config
