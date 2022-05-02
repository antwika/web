import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl';
import { LOCALES } from "../i18n/locales";
import { MESSAGES } from "../i18n/messages";

const locale = 'en-US';
// const locale = 'sv-SE';
// const locale = 'ko-KR';

function _app({ Component, pageProps }: AppProps) {
  return <>
    <IntlProvider
      messages={MESSAGES[locale]}
      locale={locale}
      defaultLocale={LOCALES.ENGLISH}>
      <Component {...pageProps} />
    </IntlProvider>
  </>
}

export default _app
