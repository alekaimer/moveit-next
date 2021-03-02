import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/levelUpModal'

export const ChallengesContexts = createContext({} as ChallengesContextData)

interface ChallengesProviderProps {
  children: ReactNode
  level: number
  currentExperience: number
  challengesCompleted: number
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
  isLevelUpModalOpen: boolean
  closeLevelUpModal: () => void
}

export function ChallengesProvider( {children, ...rest} : ChallengesProviderProps ) {
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)

  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const experienceToNextLevel = Math.pow((level+1)*4, 2) // 4 dificult experience factor

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookie.set('level', String(level))
    Cookie.set('currentExperience', String(currentExperience))
    Cookie.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function startNewChallenge () {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification(
        'Novo desafio! 🎉', {
          body: `Valendo ${challenge.amount}xp`,
          silent: true
        }
      )
    }
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

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
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
        completeChallenge,
        isLevelUpModalOpen,
        closeLevelUpModal
      }
    }>
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}

    </ChallengesContexts.Provider>
  )
}