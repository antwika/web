/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'sv-SE', 'ko-KR'],
    defaultLocale: 'en-US',
  },
}

module.exports = nextConfig
