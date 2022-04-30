import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import ExpandingBox from '../components/ExpandingBox'
import TypedText from '../components/TypedText'
import styles from './HomePage.module.css'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Antwika</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image className={styles.logoFadeIn} src="/logotype.png" alt="Antwika Logo" width={128} height={128} />
        <h1>
          <TypedText text="Welcome to" rate={20} startDelay={35+5} />
          {' '}
          <strong><TypedText text="Antwika" rate={20} startDelay={35+25} /></strong>
        </h1>
        <ExpandingBox startDelay={4500}>
          <div style={{
            padding: '8px 24px',
            lineHeight: 1.5,
          }}>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
              <a href="https://github.com/antwika/">
                <i>
                  <TypedText text="https://github.com/antwika/" rate={40} startDelay={0} />
                </i>
              </a>
            </div>
            <div>
              <a href="https://sonarcloud.io/organizations/antwika/">
                <i>
                  <TypedText text="https://sonarcloud.io/organizations/antwika/" rate={40} startDelay={5} />
                </i>
              </a>
            </div>
          </div>
        </ExpandingBox>
      </main>
    </>
  )
}

export default HomePage;
