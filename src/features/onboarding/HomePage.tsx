import { resetOnboarding } from './onboardingSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

export function HomePage() {
  const dispatch = useAppDispatch()
  const profileName = useAppSelector((state) => state.onboarding.profile.name)
  const username = useAppSelector((state) => state.onboarding.username)

  return (
    <main className="home-page">
      <section className="home-panel" aria-labelledby="home-title">
        <span className="eyebrow">Home</span>
        <h1 id="home-title">Welcome, {profileName || username}</h1>
        <p>Your onboarding is complete and your progress is saved for future visits.</p>
        <button
          className="secondary-action"
          onClick={() => dispatch(resetOnboarding())}
          type="button"
        >
          Start over
        </button>
      </section>
    </main>
  )
}
