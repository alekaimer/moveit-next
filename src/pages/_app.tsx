import '../styles/global.css'
import '../contexts/ChallengeContexts'
import { challengesContexts } from '../contexts/ChallengeContexts'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [level, setLevel] = useState(1)

  function levelUp() {
    setLevel(level + 1)
  }

  return (
    <challengesContexts.Provider value={{level, levelUp}}>
      <Component {...pageProps} />)
    </challengesContexts.Provider>
  )
}

export default MyApp
