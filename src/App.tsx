import './App.css'
import { HomePage } from './features/onboarding/HomePage'
import { LoginPage } from './features/onboarding/LoginPage'
import { OnboardingFlow } from './features/onboarding/OnboardingFlow'
import { useAppSelector } from './store/hooks'

function App() {
  const isAuthenticated = useAppSelector((state) => state.onboarding.isAuthenticated)
  const isComplete = useAppSelector((state) => state.onboarding.isComplete)

  if (isComplete) {
    return <HomePage />
  }

  if (isAuthenticated) {
    return <OnboardingFlow />
  }

  return <LoginPage />
}

export default App
