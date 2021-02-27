import { createContext, ReactNode, useState } from 'react'
import challenges from '../../challenges.json'

export const ChallengesContexts = createContext({} as ChallengesContextData)

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
  experienceToNextLevel: number
  challengesCompleted: number
  levelUp: ()=>void
  startNewChallenge: ()=>void
  activeChallenge: Challenge
  resetChallenge: ()=>void
  completeChallenge: ()=>void
}

export function ChallengesProvider( {children} : ChallengesProviderProps ) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level+1)*4, 2) // 4 dificult experience factor

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge () {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null )
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp();
    }
    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContexts.Provider value={
      {
        level, 
        currentExperience, 
        experienceToNextLevel,
        challengesCompleted, 
        levelUp, 
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge
      }
    }>
      {children}
    </ChallengesContexts.Provider>
  )
}