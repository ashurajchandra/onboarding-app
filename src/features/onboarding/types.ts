export type OnboardingStep = 1 | 2 | 3 | 4

export type ProfileFormValues = {
  name: string
  age: string
  email: string
  profilePicture: string
}

export type SongsFormValues = {
  songs: string[]
}

export type PaymentFormValues = {
  cardNumber: string
  expiryDate: string
  cvv: string
}

export type OnboardingState = {
  isAuthenticated: boolean
  username: string
  currentStep: OnboardingStep
  profile: ProfileFormValues
  songs: string[]
  payment: PaymentFormValues
  isComplete: boolean
}
