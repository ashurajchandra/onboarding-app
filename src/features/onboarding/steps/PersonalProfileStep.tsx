import { ErrorMessage, Field, Form, Formik } from 'formik'
import { goToPreviousStep, saveProfile } from '../onboardingSlice'
import type { ProfileFormValues } from '../types'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'

const validateProfile = (values: ProfileFormValues) => {
  const errors: Partial<Record<keyof ProfileFormValues, string>> = {}
  const age = Number(values.age)

  if (!values.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!values.age.trim()) {
    errors.age = 'Age is required.'
  } else if (Number.isNaN(age)) {
    errors.age = 'Age must be a number.'
  } else if (age < 13) {
    errors.age = 'Age must be at least 13.'
  } else if (age > 120) {
    errors.age = 'Age must be realistic.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email.'
  }

  return errors
}

export function PersonalProfileStep() {
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) => state.onboarding.profile)

  return (
    <Formik<ProfileFormValues>
      enableReinitialize
      initialValues={profile}
      onSubmit={(values) => {
        dispatch(saveProfile(values))
      }}
      validate={validateProfile}
    >
      {({ setFieldValue, values }) => (
        <Form className="form-grid">
          <div className="panel-heading">
            <span className="eyebrow">Step 1</span>
            <h2>Personal profile</h2>
          </div>

          <label className="field">
            <span>Name</span>
            <Field name="name" placeholder="Avery Johnson" type="text" />
            <ErrorMessage className="field-error" component="small" name="name" />
          </label>

          <div className="two-column">
            <label className="field">
              <span>Age</span>
              <Field inputMode="numeric" name="age" placeholder="29" type="text" />
              <ErrorMessage className="field-error" component="small" name="age" />
            </label>

            <label className="field">
              <span>Email</span>
              <Field name="email" placeholder="avery@example.com" type="email" />
              <ErrorMessage className="field-error" component="small" name="email" />
            </label>
          </div>

          <label className="field file-field">
            <span>Profile picture</span>
            <input
              accept="image/*"
              name="profilePicture"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0]
                if (!file) {
                  void setFieldValue('profilePicture', '')
                  return
                }

                const reader = new FileReader()
                reader.onload = () => {
                  void setFieldValue('profilePicture', String(reader.result))
                }
                reader.readAsDataURL(file)
              }}
              type="file"
            />
            <ErrorMessage className="field-error" component="small" name="profilePicture" />
          </label>

          {values.profilePicture ? (
            <img className="profile-preview" src={values.profilePicture} alt="Profile preview" />
          ) : null}

          <div className="form-actions">
            <button
              className="secondary-action"
              disabled
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
      )}
    </Formik>
  )
}
