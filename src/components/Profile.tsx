import { useContext } from 'react'
import { ChallengesContexts } from '../contexts/ChallengeContexts'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
  const { level } = useContext(ChallengesContexts)
  return (
    <div className={styles.container}>
      <img src="https://github.com/alekaimer.png" alt="Alexandre Kaimer" />
      <div>
        <strong>Alexandre Kaimer</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}