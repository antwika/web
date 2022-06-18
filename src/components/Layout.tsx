import Head from "next/head";
import styles from './Layout.module.css'
import LocalePicker from "./LocalePicker";
import { LOCALES } from '../misc/locales';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ActivityIndicatorOverlay from "./ActivityIndicatorOverlay";

type Props = {
  children: any;
};

const Layout: React.FC<Props> = ({ children }) => {
  const auth = useSelector((state: RootState) => state.auth);

  const isLoading = auth.status === 'loggingIn' || auth.status === 'loggingOut';

  return (
    <div data-testid='layout'>
      <Head>
        <title>Antwika</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header data-testid='layout-header' className={styles.header}>
        <LocalePicker locales={LOCALES} />
      </header>
      <main data-testid='layout-main' className={styles.main}>
        {!isLoading && (
          <div data-testid='layout-main-content'>
            {children}
          </div>
        )}
        {isLoading && <ActivityIndicatorOverlay />}
      </main>
    </div>
  );
};

export default Layout;
