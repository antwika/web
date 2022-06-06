import Head from "next/head";
import styles from './Layout.module.css'
import LocalePicker from "./LocalePicker";
import { LOCALES } from '../misc/locales';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import ActivityIndicator from "./ActivityIndicator";
import ActivityIndicatorOverlay from "./ActivityIndicatorOverlay";

type Props = {
  children: any;
};

const Layout: React.FC<Props> = ({ children }) => {
  const auth = useSelector((state: RootState) => state.auth);

  const isLoading = auth.status === 'loggingIn' || auth.status === 'loggingOut';

  return (
    <>
      <Head>
        <title>Antwika</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <LocalePicker locales={LOCALES} />
      </header>
      <main className={styles.main}>
        {!isLoading && (
          <>
            {children}
          </>
        )}
        {isLoading && <ActivityIndicatorOverlay />}
      </main>
    </>
  );
};

export default Layout;
