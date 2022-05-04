import type { NextPage } from 'next'
import HomePage from '../components/HomePage'
import { useRouter } from 'next/router'

import { IntlProvider } from 'react-intl';
import { LOCALES } from "../i18n/locales";
import { MESSAGES } from "../i18n/messages";

const RootPage: NextPage = () => {
  const router = useRouter();
  const locale = router.locale || 'en-US';

  return (
    <IntlProvider
      messages={MESSAGES[ locale ]}
      locale={locale}
      defaultLocale={LOCALES.ENGLISH}>
        <HomePage />
    </IntlProvider>
  );
}

export default RootPage;
