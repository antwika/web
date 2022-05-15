import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import { MESSAGES } from '../i18n/messages'
import { useRouter } from 'next/router';
import { LOCALES } from '../i18n/locales';
import { store } from '../redux/store';
import { Provider } from 'react-redux';

function _app({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = router.locale || 'en-US';

  return <>
    <Provider store={store}>
      <IntlProvider
        messages={MESSAGES[ locale ]}
        locale={locale}
        defaultLocale={LOCALES.ENGLISH}
        defaultRichTextElements={{
          strong: (chunks) => (<strong>{chunks}</strong>)
        }}
      >
        <Component {...pageProps} />
      </IntlProvider>
    </Provider>
  </>
}

export default _app
