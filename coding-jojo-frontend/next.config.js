/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // FIXED: Add Cloudinary domain
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Unsplash images
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    // Add domains for older Next.js versions (fallback)
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    // Disable image optimization for external placeholder images
    unoptimized: process.env.NODE_ENV === 'development',
  },
  experimental: {
    optimizeCss: false, // Keep this if you're having CSS optimization issues
  },
  // Handle case sensitivity issues on Windows (keep this if needed)
  webpack: (config, { dev, isServer }) => {
    config.resolve.symlinks = false;
    config.resolve.cacheWithContext = false;
    
    const IgnoreCaseSensitivityPlugin = {
      apply: (compiler) => {
        compiler.hooks.compilation.tap('IgnoreCaseSensitivity', (compilation) => {
          compilation.hooks.afterOptimizeChunks.tap('IgnoreCaseSensitivity', () => {
            compilation.warnings = compilation.warnings.filter(
              warning => !warning.message || !warning.message.includes('only differ in casing')
            );
          });
        });
        
        compiler.hooks.done.tap('IgnoreCaseSensitivity', (stats) => {
          if (stats.compilation.warnings) {
            stats.compilation.warnings = stats.compilation.warnings.filter(
              warning => !warning.message || !warning.message.includes('only differ in casing')
            );
          }
        });
      }
    };
    
    config.plugins = config.plugins || [];
    config.plugins.push(IgnoreCaseSensitivityPlugin);
    
    return config;
  },
  // You can probably remove these now that React versions are compatible
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

module.exports = nextConfig;