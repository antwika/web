import type { NextPage } from 'next'
import Head from 'next/head'
import ExpandingBox from '../components/ExpandingBox'
import Logotype from '../components/Logotype'
import TypedText from '../components/TypedText'
import Button from '../components/ui/Button'
import TextInput from '../components/ui/TextInput'
import styles from './HomePage.module.css'
import { useIntl } from 'react-intl';

const HomePage: NextPage = () => {
  const intl = useIntl();

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
          <TypedText text={intl.formatMessage({ id: 'welcome_to' }, { name: 'Antwika' })} rate={20} startDelay={5+5} />
        </h1>
        <ExpandingBox startDelay={2000}>
          <div className={styles.loginGridContainer}>
            <TextInput type="text" placeholder={`${intl.formatMessage({ id: 'username' })}...`} />
            <TextInput type="password" placeholder={`${intl.formatMessage({ id: 'password' })}...`} />
            <Button type="submit" label={`${intl.formatMessage({ id: 'log_in' })}`} onClick={() => {
              console.log('clicked');
            }} />
           </div>
        </ExpandingBox>
        <div style={{
          padding: '16px',
          lineHeight: 1.5,
        }}>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <a href="https://github.com/antwika/">
              <i>
                <TypedText text="https://github.com/antwika/" rate={40} startDelay={170} />
              </i>
            </a>
          </div>
          <div>
            <a href="https://sonarcloud.io/organizations/antwika/">
              <i>
                <TypedText text="https://sonarcloud.io/organizations/antwika/" rate={40} startDelay={170+5} />
              </i>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

export default HomePage;
