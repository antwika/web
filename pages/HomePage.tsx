import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
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
        <Image className={styles.fadeIn} src="/logotype.png" alt="Antwika Logo" width={128} height={128} />
        <h1>
          <TypedText text="Welcome to" rate={20} startDelay={35+5} />
          {' '}
          <strong><TypedText text="Antwika" rate={20} startDelay={35+25} /></strong>
        </h1>
      </main>
    </>
  )
}

export default HomePage;
