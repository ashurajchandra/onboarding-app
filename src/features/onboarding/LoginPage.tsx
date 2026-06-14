import { type FormEvent, useState } from 'react'
import { VALID_CREDENTIALS, loginSucceeded } from './onboardingSlice'
import { useAppDispatch } from '../../store/hooks'

export function LoginPage() {
  const dispatch = useAppDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      setError('')
      dispatch(loginSucceeded(username))
      return
    }

    setError('Invalid username or password.')
  }

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="login-title">
        <div className="panel-heading">
          <span className="eyebrow">Onboarding portal</span>
          <h1 id="login-title">Welcome back</h1>
          <p>Sign in to continue your setup.</p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="field">
            <span>Username</span>
            <input
              autoComplete="username"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              placeholder="user123"
              type="text"
              value={username}
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              autoComplete="current-password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="password123"
              type="password"
              value={password}
            />
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <button className="primary-action" type="submit">
            Sign in
          </button>
        </form>
      </section>
    </main>
  )
}
