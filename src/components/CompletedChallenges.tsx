import { useContext } from 'react'
import { ChallengesContexts } from '../contexts/ChallengeContexts'
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengesContexts)

  return (
    <div className={styles.container}>
      <span>Desafios Completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}