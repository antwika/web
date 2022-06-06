import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import { useRouter } from 'next/router';
import { MESSAGES } from '../misc/locales';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/Layout';

function _app({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = router.locale || 'en-US';

  return <>
    <Provider store={store}>
      <IntlProvider
        messages={MESSAGES[locale]}
        locale={locale}
        defaultLocale={'en-US'}
        defaultRichTextElements={{
          strong: (chunks) => (<strong>{chunks}</strong>)
        }}
      >
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </IntlProvider>
    </Provider>
  </>
}

export default _app
