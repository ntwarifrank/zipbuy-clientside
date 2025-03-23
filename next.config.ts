import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "www.lamborghini.com",
      "encrypted-tbn0.gstatic.com",
      "m.media-amazon.com",
      "images-na.ssl-images-amazon.com",
      "www.google.com",
      "media.istockphoto.com",
      "i5.walmartimages.com",
      "upload.wikimedia.org",
      "res.cloudinary.com",
      
    ],
  },
  experimental: {
    optimizeCss: true, // Ensures CSS is used efficiently
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore TypeScript build errors
  },

};


export default nextConfig;
