import '../styles/global.css'
import '../contexts/ChallengeContexts'
import { ChallengesProvider } from '../contexts/ChallengeContexts'

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />)
    </ChallengesProvider>
  )
}

export default MyApp
