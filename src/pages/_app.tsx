import '../styles/global.css'
import '../contexts/ChallengeContexts'
import { ChallengesProvider } from '../contexts/ChallengeContexts'

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
