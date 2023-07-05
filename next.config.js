 const securityHeaders = [
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/exchangerates",
        destination: "https://poc-multisite-apis.vercel.app/api/exchangerates"
      }
    ]
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
    ];
  }
};
