import { useContext, useEffect, useState } from 'react'
import { ChallengesContexts } from '../contexts/ChallengeContexts';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout : NodeJS.Timeout;
const initialTime: Number = (.10 * 60)

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContexts)

  const [time, setTime] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(initialTime)
  }

  useEffect(()=>{
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time == 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return(
    <div>
      
      <div className={styles.container}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ?  (
        <button 
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : 
        !isActive ? (

          <button 
            type="button" 
            className={styles.countdownButton}
            onClick={startCountdown}  
          >
            Iniciar um ciclo
          </button>
  
          ) : (
  
          <button 
            type="button" 
            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
            onClick={resetCountdown}
          >
            Abandonar ciclo
          </button>
  
          )
      }

    </div>
  )
}