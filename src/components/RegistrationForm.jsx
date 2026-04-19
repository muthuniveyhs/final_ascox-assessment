import { useState } from 'react'
import './RegistrationForm.css'

// ── Validation logic ──────────────────────────────────────────────────────────

function validateName(value) {
  if (!value.trim()) return 'Name is required.'
  if (value.trim().length < 2) return 'Name must be at least 2 characters.'
  return ''
}

function validateEmail(value) {
  if (!value.trim()) return 'Email is required.'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) return 'Please enter a valid email address.'
  return ''
}

function validatePassword(value) {
  if (!value) return 'Password is required.'
  if (value.length < 8) return 'Password must be at least 8 characters.'
  return ''
}

function getPasswordStrength(password) {
  if (!password) return null
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (score <= 1) return { label: 'Weak', level: 1 }
  if (score <= 3) return { label: 'Fair', level: 2 }
  return { label: 'Strong', level: 3 }
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FormField({ label, error, touched, children }) {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {children}
      {touched && error && (
        <p className="form-error" role="alert">
          <span className="error-icon">!</span>
          {error}
        </p>
      )}
    </div>
  )
}

function PasswordStrengthBar({ password }) {
  const strength = getPasswordStrength(password)
  if (!strength) return null

  const colors = { 1: '#ef4444', 2: '#f59e0b', 3: '#22c55e' }
  const color = colors[strength.level]

  return (
    <div className="strength-bar-container">
      <div className="strength-bars">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="strength-bar-segment"
            style={{ background: i <= strength.level ? color : '#e2e8f0' }}
          />
        ))}
      </div>
      <span className="strength-label" style={{ color }}>
        {strength.label}
      </span>
    </div>
  )
}

function SuccessMessage({ name, email, onReset }) {
  return (
    <div className="success-container">
      <div className="success-icon-wrap">
        <svg viewBox="0 0 24 24" fill="none" className="success-icon">
          <circle cx="12" cy="12" r="11" stroke="#16a34a" strokeWidth="1.5"/>
          <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 className="success-title">Registration Successful!</h3>
      <p className="success-sub">
        Welcome, <strong>{name}</strong>! A confirmation has been sent to <strong>{email}</strong>.
      </p>
      <button className="btn-outline" onClick={onReset}>
        Register another account
      </button>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function RegistrationForm() {
  const [fields, setFields] = useState({ name: '', email: '', password: '' })
  const [touched, setTouched] = useState({ name: false, email: false, password: false })
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const errors = {
    name: validateName(fields.name),
    email: validateEmail(fields.email),
    password: validatePassword(fields.password),
  }

  const isFormValid = !errors.name && !errors.email && !errors.password

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Touch all fields to show any remaining errors
    setTouched({ name: true, email: true, password: true })
    if (isFormValid) {
      setSubmitted(true)
    }
  }

  const handleReset = () => {
    setFields({ name: '', email: '', password: '' })
    setTouched({ name: false, email: false, password: false })
    setSubmitted(false)
  }

  if (submitted) {
    return <SuccessMessage name={fields.name} email={fields.email} onReset={handleReset} />
  }

  return (
    <div className="reg-form-wrapper">
      <div className="reg-form-header">
        <h2 className="section-title">Create an Account</h2>
        <p className="section-desc">All fields are required. Errors show on blur.</p>
      </div>

      <form className="reg-form" onSubmit={handleSubmit} noValidate>
        <FormField label="Full Name" error={errors.name} touched={touched.name}>
          <input
            type="text"
            name="name"
            className={`form-input ${touched.name && errors.name ? 'input-error' : ''}`}
            placeholder="e.g. Arjun Mehta"
            value={fields.name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="name"
          />
        </FormField>

        <FormField label="Email Address" error={errors.email} touched={touched.email}>
          <input
            type="email"
            name="email"
            className={`form-input ${touched.email && errors.email ? 'input-error' : ''}`}
            placeholder="you@example.com"
            value={fields.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
          />
        </FormField>

        <FormField label="Password" error={errors.password} touched={touched.password}>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className={`form-input ${touched.password && errors.password ? 'input-error' : ''}`}
              placeholder="Minimum 8 characters"
              value={fields.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁'}
            </button>
          </div>
          <PasswordStrengthBar password={fields.password} />
        </FormField>

        <div className="form-footer">
          <button
            type="submit"
            className="btn-primary"
            disabled={!isFormValid}
            title={!isFormValid ? 'Please fix the errors above' : ''}
          >
            Create Account
          </button>
          {!isFormValid && Object.values(touched).some(Boolean) && (
            <p className="form-hint">Please fix the errors above to continue.</p>
          )}
        </div>
      </form>
    </div>
  )
}
