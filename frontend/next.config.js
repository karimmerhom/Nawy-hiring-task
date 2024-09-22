module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['i.ibb.co'], // Allow all domains
  },
    reactStrictMode: false,
      async redirects() {
          return [
            {
              source: '/',
              destination:'/listings',
              permanent: true,
            },
          ]
        },
  }