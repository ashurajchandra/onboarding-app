import { ErrorMessage, Field, FieldArray, Form, Formik, type FormikErrors } from 'formik'
import { goToPreviousStep, saveSongs } from '../onboardingSlice'
import type { SongsFormValues } from '../types'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'

const validateSongs = (values: SongsFormValues) => {
  const errors: FormikErrors<SongsFormValues> = {}
  const songErrors = values.songs.map((song) =>
    song.trim() ? '' : 'Song title is required.',
  )

  if (songErrors.some(Boolean)) {
    errors.songs = songErrors
  }

  return errors
}

export function FavoriteSongsStep() {
  const dispatch = useAppDispatch()
  const songs = useAppSelector((state) => state.onboarding.songs)

  return (
    <Formik<SongsFormValues>
      enableReinitialize
      initialValues={{ songs }}
      onSubmit={(values) => {
        dispatch(saveSongs(values.songs))
      }}
      validate={validateSongs}
    >
      {({ values }) => (
        <Form className="form-grid">
          <div className="panel-heading">
            <span className="eyebrow">Step 2</span>
            <h2>Favorite songs</h2>
          </div>

          <FieldArray name="songs">
            {({ push, remove }) => (
              <div className="song-list">
                {values.songs.map((_, index) => (
                  <div className="song-row" key={index}>
                    <label className="field">
                      <span>Song {index + 1}</span>
                      <Field name={`songs.${index}`} placeholder="Song title" type="text" />
                      <ErrorMessage
                        className="field-error"
                        component="small"
                        name={`songs.${index}`}
                      />
                    </label>
                    <button
                      aria-label={`Remove song ${index + 1}`}
                      className="icon-action"
                      disabled={values.songs.length === 1}
                      onClick={() => remove(index)}
                      type="button"
                    >
                      -
                    </button>
                  </div>
                ))}

                <button className="secondary-action inline-action" onClick={() => push('')} type="button">
                  Add song
                </button>
              </div>
            )}
          </FieldArray>

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
      )}
    </Formik>
  )
}
