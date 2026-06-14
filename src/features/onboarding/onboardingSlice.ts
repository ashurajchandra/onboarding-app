import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type {
  OnboardingState,
  OnboardingStep,
  PaymentFormValues,
  ProfileFormValues,
} from './types'

export const VALID_CREDENTIALS = {
  username: 'user123',
  password: 'password123',
} as const

export const initialOnboardingState: OnboardingState = {
  isAuthenticated: false,
  username: '',
  currentStep: 1,
  profile: {
    name: '',
    age: '',
    email: '',
    profilePicture: '',
  },
  songs: [''],
  payment: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  },
  isComplete: false,
}

const nextStep = (step: OnboardingStep): OnboardingStep =>
  step < 4 ? ((step + 1) as OnboardingStep) : step

const previousStep = (step: OnboardingStep): OnboardingStep =>
  step > 1 ? ((step - 1) as OnboardingStep) : step

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: initialOnboardingState,
  reducers: {
    loginSucceeded: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true
      state.username = action.payload
    },
    saveProfile: (state, action: PayloadAction<ProfileFormValues>) => {
      state.profile = action.payload
      state.currentStep = nextStep(state.currentStep)
    },
    saveSongs: (state, action: PayloadAction<string[]>) => {
      state.songs = action.payload.filter((song) => song.trim().length > 0)
      if (state.songs.length === 0) {
        state.songs = ['']
      }
      state.currentStep = nextStep(state.currentStep)
    },
    savePayment: (state, action: PayloadAction<PaymentFormValues>) => {
      state.payment = action.payload
      state.currentStep = nextStep(state.currentStep)
    },
    goToPreviousStep: (state) => {
      state.currentStep = previousStep(state.currentStep)
    },
    goToStep: (state, action: PayloadAction<OnboardingStep>) => {
      state.currentStep = action.payload
    },
    completeOnboarding: (state) => {
      state.isComplete = true
      state.currentStep = 4
    },
    resetOnboarding: () => initialOnboardingState,
  },
})

export const {
  completeOnboarding,
  goToPreviousStep,
  goToStep,
  loginSucceeded,
  resetOnboarding,
  savePayment,
  saveProfile,
  saveSongs,
} = onboardingSlice.actions

export default onboardingSlice.reducer
