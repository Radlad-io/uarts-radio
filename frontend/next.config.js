// next.config.js

module.exports = {
    images: {
      // Content API 
      deviceSizes: [640,750,828,1080,1200,2048,3840],
      imageSizes: [16,32,48,64,96,128,256,384],
      domains: ['uarts-radio.kevinmerinsky.com'],
      minimumCacheTTL: 600,
    },
  }