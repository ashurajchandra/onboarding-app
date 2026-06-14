import { configureStore } from '@reduxjs/toolkit'
import onboardingReducer from '../features/onboarding/onboardingSlice'
import {
  loadPersistedOnboardingState,
  persistOnboardingState,
} from './persistence'

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
  },
  preloadedState: {
    onboarding: loadPersistedOnboardingState(),
  },
})

store.subscribe(() => {
  persistOnboardingState(store.getState().onboarding)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
