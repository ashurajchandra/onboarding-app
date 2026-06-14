import type { ReactElement } from 'react'
import { useAppSelector } from '../../store/hooks'
import type { OnboardingStep } from './types'
import { FavoriteSongsStep } from './steps/FavoriteSongsStep'
import { PaymentInformationStep } from './steps/PaymentInformationStep'
import { PersonalProfileStep } from './steps/PersonalProfileStep'
import { SuccessStep } from './steps/SuccessStep'

const steps: Array<{ id: OnboardingStep; label: string }> = [
  { id: 1, label: 'Profile' },
  { id: 2, label: 'Songs' },
  { id: 3, label: 'Payment' },
  { id: 4, label: 'Success' },
]

const stepComponents: Record<OnboardingStep, ReactElement> = {
  1: <PersonalProfileStep />,
  2: <FavoriteSongsStep />,
  3: <PaymentInformationStep />,
  4: <SuccessStep />,
}

export function OnboardingFlow() {
  const currentStep = useAppSelector((state) => state.onboarding.currentStep)

  return (
    <main className="onboarding-page">
      <aside className="progress-panel" aria-label="Onboarding progress">
        <span className="eyebrow">Setup</span>
        <h1>Complete your account</h1>
        <ol className="step-list">
          {steps.map((step) => {
            const isActive = step.id === currentStep
            const isComplete = step.id < currentStep

            return (
              <li
                className={isActive ? 'active' : isComplete ? 'complete' : undefined}
                key={step.id}
              >
                <span>{step.id}</span>
                {step.label}
              </li>
            )
          })}
        </ol>
      </aside>

      <section className="step-panel" aria-live="polite">
        {stepComponents[currentStep]}
      </section>
    </main>
  )
}
