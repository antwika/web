import '../styles/globals.css'
import type { AppProps } from 'next/app'

function _app({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
  </>
}

export default _app
