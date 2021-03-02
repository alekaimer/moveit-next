import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { ChallengesContexts } from "./ChallengeContexts"

interface CountdownContextData {
  hasFinished: boolean
  minutes: number
  seconds: number
  isActive: boolean
  startCountdown: ()=> void
  resetCountdown: ()=> void
}

interface CountdownProvider {
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout : NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProvider) {
  const { startNewChallenge } = useContext(ChallengesContexts)

  const [time, setTime] = useState(0.10 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(0.10 * 60)
    setHasFinished(false)
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

  return (
    <CountdownContext.Provider value={{
      hasFinished, 
      minutes, 
      seconds,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      { children }
    </CountdownContext.Provider>
  )
}