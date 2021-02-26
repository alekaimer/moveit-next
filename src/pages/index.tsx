import { CompletedChallenges } from "../components/CompletedChallenges";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      
      <ExperienceBar />
      
      <section>
        <div className={styles.leftContainer}>
          <Profile />
          <CompletedChallenges />
        </div>
        <div className={styles.rightContainer}>

        </div>
      </section>
      
    </div>
  )
}
