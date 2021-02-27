import { createContext, ReactNode, useState } from 'react'
import challenges from '../../challenges.json'

export const challengesContexts = createContext({} as ChallengesContextData)

interface ChallengesProviderProps {
  children: ReactNode;
}

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}
interface ChallengesContextData {
  level: number
  currentExperience: number
  challengesCompleted: number
  levelUp: ()=>void
  startNewChallenge: ()=>void
  activeChallenge: Challenge
}

export function ChallengesProvider( {children} : ChallengesProviderProps ) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)

  const [activeChallenge, setActiveChallenge] = useState(null)

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge () {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)
  }

  return (
    <challengesContexts.Provider value={
      {
        level, 
        currentExperience, 
        challengesCompleted, 
        levelUp, 
        startNewChallenge,
        activeChallenge
      }
    }>
      {children}
    </challengesContexts.Provider>
  )
}