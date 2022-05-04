import type { NextPage } from 'next'
import HomePage from './HomePage'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { IntlProvider } from 'react-intl';
import { LOCALES } from "../i18n/locales";
import { MESSAGES } from "../i18n/messages";

const locale = 'en-US';
// const locale = 'sv-SE';
// const locale = 'ko-KR';

const RootPage: NextPage = () => {
  return (
    <IntlProvider
      messages={MESSAGES[locale]}
      locale={locale}
      defaultLocale={LOCALES.ENGLISH}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default RootPage;
