import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from './HomePage.module.css'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Antwika</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image src="/logotype.png" alt="Antwika Logo" width={128} height={128} />
        <h1>Welcome to <strong>Antwika</strong></h1>
      </main>
    </>
  )
}

export default HomePage;
