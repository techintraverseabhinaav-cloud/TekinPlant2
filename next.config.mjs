/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Exclude src directory from page discovery
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Exclude react-router-dom from server components
  serverExternalPackages: ['react-router-dom'],
  images: {
    unoptimized: false, // Enable image optimization for better performance
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Exclude old React Router files from compilation
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    // Ignore src/pages directory and old React Router files
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      include: [
        /src\/pages\//,
        /src\/App\.jsx$/,
        /src\/main\.jsx$/,
        /src\/components\/Sidebar\.jsx$/
      ],
      use: {
        loader: 'ignore-loader'
      }
    })
    // Exclude src/pages from being resolved
    config.resolve.alias = {
      ...config.resolve.alias,
      'src/pages': false,
      'src/App': false,
      'src/main': false,
    }
    return config
  },
  // Enable compression
  compress: true,
  // Enable React strict mode for better performance
  reactStrictMode: true,
}

export default nextConfig
