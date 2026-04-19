# ASCOX – Registration Form
### Web Developer Assessment – Challenge 2

---

## Features
- Fields: Name, Email, Password
- Validation: required fields, email format (regex), password min 8 characters
- Errors appear on blur — not on first render
- Password strength indicator (Weak / Fair / Strong)
- Show / hide password toggle
- Submit button disabled until all fields are valid
- Success message on valid submission with reset option

## Tech Stack
- React 18 (functional components + hooks)
- Vite
- Vanilla CSS

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Key React Concepts
- `useState` for form fields, touched state, and submission
- Controlled inputs with `onChange` / `onBlur`
- Derived validation (errors computed from values, not stored in state)
- Conditional rendering for error messages and success screen
- Component composition: `FormField`, `PasswordStrengthBar`, `SuccessMessage`
