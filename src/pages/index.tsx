import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdows";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from '../contexts/ChallengeContexts';
import { ReactNode } from 'react';
import { LevelUpModal } from '../components/levelUpModal';

interface HomeProps {
  children: ReactNode
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Home(props: HomeProps) {

  console.log(props) // views props get from the client-side

  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}
    >
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
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => { // before the document is fully loaded (run in node server)
  const { level, currentExperience, challengesCompleted } = context.req.cookies

  // console.log(user) // views props get from the server-side

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}

