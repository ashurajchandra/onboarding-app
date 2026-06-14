import { ErrorMessage, Field, Form, Formik } from 'formik'
import { goToPreviousStep, savePayment } from '../onboardingSlice'
import type { PaymentFormValues } from '../types'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'

const validatePayment = (values: PaymentFormValues) => {
  const errors: Partial<Record<keyof PaymentFormValues, string>> = {}

  if (!values.cardNumber.trim()) {
    errors.cardNumber = 'Card number is required.'
  } else if (!/^[0-9 ]{13,23}$/.test(values.cardNumber)) {
    errors.cardNumber = 'Enter a valid card number.'
  }

  if (!values.expiryDate.trim()) {
    errors.expiryDate = 'Expiry date is required.'
  } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.expiryDate)) {
    errors.expiryDate = 'Use MM/YY format.'
  }

  if (!values.cvv.trim()) {
    errors.cvv = 'CVV is required.'
  } else if (!/^\d{3,4}$/.test(values.cvv)) {
    errors.cvv = 'CVV must be 3 or 4 digits.'
  }

  return errors
}

export function PaymentInformationStep() {
  const dispatch = useAppDispatch()
  const payment = useAppSelector((state) => state.onboarding.payment)

  return (
    <Formik<PaymentFormValues>
      enableReinitialize
      initialValues={payment}
      onSubmit={(values) => {
        dispatch(savePayment(values))
      }}
      validate={validatePayment}
    >
      <Form className="form-grid">
        <div className="panel-heading">
          <span className="eyebrow">Step 3</span>
          <h2>Payment information</h2>
        </div>

        <label className="field">
          <span>Card number</span>
          <Field
            autoComplete="cc-number"
            inputMode="numeric"
            name="cardNumber"
            placeholder="4242 4242 4242 4242"
            type="text"
          />
          <ErrorMessage className="field-error" component="small" name="cardNumber" />
        </label>

        <div className="two-column">
          <label className="field">
            <span>Expiry date</span>
            <Field
              autoComplete="cc-exp"
              inputMode="numeric"
              name="expiryDate"
              placeholder="08/29"
              type="text"
            />
            <ErrorMessage className="field-error" component="small" name="expiryDate" />
          </label>

          <label className="field">
            <span>CVV</span>
            <Field
              autoComplete="cc-csc"
              inputMode="numeric"
              name="cvv"
              placeholder="123"
              type="password"
            />
            <ErrorMessage className="field-error" component="small" name="cvv" />
          </label>
        </div>

        <div className="form-actions">
          <button
            className="secondary-action"
            onClick={() => dispatch(goToPreviousStep())}
            type="button"
          >
            Back
          </button>
          <button className="primary-action" type="submit">
            Continue
          </button>
        </div>
      </Form>
    </Formik>
  )
}
