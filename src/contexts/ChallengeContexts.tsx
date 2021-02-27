import { createContext, ReactNode, useState } from 'react'

export const challengesContexts = createContext({} as ChallengesContextData)

interface ChallengesProviderProps {
  children: ReactNode;
}

interface ChallengesContextData {
  level: number
  currentExperience: number
  challengesCompleted: number
  levelUp: ()=>void
  startNewChallenge: ()=>void
}

export function ChallengesProvider( {children} : ChallengesProviderProps ) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge () {
    console.log('start new challenge')
  }

  return (
    <challengesContexts.Provider value={
      {
        level, 
        currentExperience, 
        challengesCompleted, 
        levelUp, 
        startNewChallenge
      }
    }>
      {children}
    </challengesContexts.Provider>
  )
}