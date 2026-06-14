import type { OnboardingState } from '../features/onboarding/types'
import { initialOnboardingState } from '../features/onboarding/onboardingSlice'

const STORAGE_KEY = 'onboarding-flow-state-v1'

const isBrowser = typeof window !== 'undefined'

export const loadPersistedOnboardingState = (): OnboardingState => {
  if (!isBrowser) {
    return initialOnboardingState
  }

  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY)
    if (!rawState) {
      return initialOnboardingState
    }

    const parsedState = JSON.parse(rawState) as Partial<OnboardingState>

    return {
      ...initialOnboardingState,
      ...parsedState,
      profile: {
        ...initialOnboardingState.profile,
        ...parsedState.profile,
      },
      payment: {
        ...initialOnboardingState.payment,
        ...parsedState.payment,
      },
      songs:
        Array.isArray(parsedState.songs) && parsedState.songs.length > 0
          ? parsedState.songs
          : initialOnboardingState.songs,
      currentStep:
        parsedState.currentStep && parsedState.currentStep >= 1 && parsedState.currentStep <= 4
          ? parsedState.currentStep
          : initialOnboardingState.currentStep,
    }
  } catch {
    return initialOnboardingState
  }
}

export const persistOnboardingState = (state: OnboardingState) => {
  if (!isBrowser) {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
