import { createContext, ReactNode, useState } from 'react'

export const challengesContexts = createContext({})

interface ChallengesProviderProps {
  children: ReactNode;
}

export function ChallengesProvider( {children} : ChallengesProviderProps ) {
  const [level, setLevel] = useState(1)
  const {currentExperience, setCurrentExperience} = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)

  function levelUp() {
    setLevel(level + 1)
  }

  return (
    <challengesContexts.Provider value={{level, levelUp, currentExperience, challengesCompleted}}>
      {children}
    </challengesContexts.Provider>
  )
}