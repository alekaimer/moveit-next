import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdows";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import Head from 'next/head'

import styles from '../styles/pages/Home.module.css'
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | Move.it</title>
      </Head>


      <ExperienceBar />
      
      <CountdownProvider>
        <section>
          <div className={styles.leftContainer}>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div className={styles.rightContainer}>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
      
    </div>
  )
}
