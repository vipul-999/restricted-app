/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/(.*)', // Applies these headers to all routes
          headers: [
            {
              key: 'X-Robots-Tag',
              value: 'noindex, nofollow', // Prevent search engines from indexing or following links
            },
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self'; script-src 'self';", // Restrict sources of content
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  