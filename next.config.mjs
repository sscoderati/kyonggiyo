import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kyonggiyo-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
      }
    ]
  }
};

export default withPWA(nextConfig);
