import { useContext } from 'react';
import { challengesContexts } from '../contexts/ChallengeContexts';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  const { activeChallenge } = useContext(challengesContexts)

  return (
    <div className={styles.container}>
      { activeChallenge ? 
        <div className={styles.active}>
          <header>Ganhe {activeChallenge.amount}xp</header>
          <main>
            <img src={"icons/" + activeChallenge.type + ".svg"} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button 
              type="button" 
              className={styles.failedButton} 
              >
                Falhei
            </button>
            <button 
              type="button" 
              className={styles.succeededButton} 
              >Completei
            </button>
          </footer>
        </div>
       : (
        
        <div className={styles.notActive}>
          <strong>Finalize um ciclo para receber um desafio.</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Avance de level completando desafios.
          </p>
        </div>
        
      ) }
    </div>
  )
}