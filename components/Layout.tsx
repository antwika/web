import Head from "next/head";
import styles from './Layout.module.css'
import LocalePicker from "./LocalePicker";
import { LOCALES } from '../misc/locales';

type Props = {
  children: any;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Antwika</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <LocalePicker locales={LOCALES} />
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </>
  );
};

export default Layout;
