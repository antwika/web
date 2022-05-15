import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import Logotype from '../components/Logotype'
import Button from '../components/ui/Button'
import TextInput from '../components/ui/TextInput'
import { generateAuthUrl, generateCodeChallengeFromVerifier, generateCodeVerifier } from '../misc/oidc'
import styles from './index.module.css'

const IndexPage: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();
  const [codeVerifier, setCodeVerifier] = useState<string | null>(null);

  useEffect(() => {
    try {
      const item = localStorage.getItem('accessToken');
      if (item) {
        const accessToken = JSON.parse(item);
        console.log('found accessToken in localStorage:', accessToken);
      }
    } catch (err) {
      // NOP
    }
  }, []);

  useEffect(() => {
    if (!codeVerifier) return;
    
    generateCodeChallengeFromVerifier(codeVerifier).then((codeChallenge) => {
      console.log('codeVerifier:', codeVerifier);
      console.log('codeChallenge:', codeChallenge);
      console.log('generateAuthUrl(intl.locale):', generateAuthUrl(intl.locale, codeChallenge));
      router.push(generateAuthUrl(intl.locale, codeChallenge));
    });
  }, [router, intl, codeVerifier]);

  const onSubmit = async () => {
    const codeVerifier = generateCodeVerifier();
    localStorage.setItem('codeVerifier', JSON.stringify(codeVerifier));
    setCodeVerifier(codeVerifier);
  }

  return (
    <>
      <Head>
        <title>Antwika</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoFadeIn}>
          <Logotype />
        </div>
        <h1>
          {intl.formatMessage({ id: 'welcome_to' }, { name: 'Antwika' })}
        </h1>
        <div className={styles.loginGridContainer}>
          <Button type="submit" label={`${intl.formatMessage({ id: 'log_in' })}`} onClick={onSubmit} />
        </div>
        <div style={{
          padding: '16px',
          lineHeight: 1.5,
        }}>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <a href="https://github.com/antwika/">
              <i>
                https://github.com/antwika/
              </i>
            </a>
          </div>
          <div>
            <a href="https://sonarcloud.io/organizations/antwika/">
              <i>
                https://sonarcloud.io/organizations/antwika/
              </i>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

export default IndexPage;
