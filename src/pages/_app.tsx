import '../../styles/globals.css'
import { withTRPC } from '@trpc/next';
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import { useRouter } from 'next/router';
import { MESSAGES } from '../misc/locales';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/Layout';
import { AppRouter } from './api/trpc/[trpc]';
import { ThemeContext, ThemeProvider } from '../context/ThemeContext';
import * as config from '../misc/config';

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
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </AuthProvider>
      </IntlProvider>
    </Provider>
  </>
}

export default withTRPC<AppRouter>({
  config({ ctx: _ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${config.baseUrl()}/api/trpc`;

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(_app);
