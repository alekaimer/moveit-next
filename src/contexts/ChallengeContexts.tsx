import { createContext, ReactNode, useState } from 'react'

export const challengesContexts = createContext({})

interface ChallengesProviderProps {
  children: ReactNode;
}

export function ChallengesProvider( {children} : ChallengesProviderProps ) {
  const [level, setLevel] = useState(1)

  function levelUp() {
    setLevel(level + 1)
  }

  return (
    <challengesContexts.Provider value={{level, levelUp}}>
      {children}
    </challengesContexts.Provider>
  )
}