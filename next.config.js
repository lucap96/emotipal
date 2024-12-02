/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}'
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}'
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '**'
      }
    ]
  },
  // rewrites: async () => {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination:
  //         process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000/api/:path*' : '/api/',
  //     },
  //   ]
  // },
  env: {
    NEXT_APP_VERSION: 'v1.0.0',
    NEXTAUTH_SECRET: 'LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=',
    NEXTAUTH_URL: 'http://localhost:3000/',
    NEXT_APP_GOOGLE_MAPS_API_KEY: 'AIzaSyAXv4RQK39CskcIB8fvM1Q7XCofZcLxUXw',
    NEXT_APP_MAPBOX_ACCESS_TOKEN: 'pk.eyJ1IjoicmFrZXNoLW5ha3JhbmkiLCJhIjoiY2xsNjNkZm0yMGhvcDNlb3phdjF4dHlzeiJ9.ps6azYbr7M3rGk_QTguMEQ',
    // NEXT_APP_API_URL: 'https://mock-data-api-nextjs.vercel.app',
    NEXT_APP_API_URL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000/' : '/api/',
    NEXT_APP_JWT_SECRET: 'ikRgjkhi15HJiU78',
    NEXT_APP_JWT_TIMEOUT: '86400',
    NEXTAUTH_SECRET_KEY: 'LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=',
  }
};

module.exports = nextConfig;
