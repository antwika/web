import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import Logotype from '../components/Logotype';
import { RootState } from '../redux/store';
import styles from './home.module.css';

const HomePage: NextPage = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const intl = useIntl();
  
  useEffect(() => {
    if (!router) return;
    if (!user) router.push('/');
  }, [router, user]);

  return (
    <>
      <Head>
        <title>Antwika - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.logoFadeIn}>
          <Logotype />
        </div>
        <h1>
          {intl.formatMessage({ id: 'welcome' }, { name: user?.id })}
        </h1>
        <div>
          <strong>{ user?.accessToken }</strong>
        </div>
      </main>
    </>
  )
}

export default HomePage;
