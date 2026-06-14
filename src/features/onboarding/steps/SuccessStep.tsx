import { completeOnboarding, goToPreviousStep } from '../onboardingSlice'
import { useAppDispatch } from '../../../store/hooks'

export function SuccessStep() {
  const dispatch = useAppDispatch()

  return (
    <div className="success-state">
      <span className="success-mark" aria-hidden="true">
        ✓
      </span>
      <div className="panel-heading">
        <span className="eyebrow">Step 4</span>
        <h2>Onboarding complete</h2>
        <p>Your profile, songs, and payment details have been saved.</p>
      </div>

      <div className="form-actions">
        <button
          className="secondary-action"
          onClick={() => dispatch(goToPreviousStep())}
          type="button"
        >
          Back
        </button>
        <button className="primary-action" onClick={() => dispatch(completeOnboarding())} type="button">
          Go home
        </button>
      </div>
    </div>
  )
}
