import React from 'react'
import ReactDOM from 'react-dom/client'
import RegistrationForm from './components/RegistrationForm.jsx'
import './index.css'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="page-wrapper">
      <div className="card">
        <div className="card-header">
          <p className="header-label">  Web Developer</p>
          <h1 className="header-title">Registration Form</h1>
        </div>
        <RegistrationForm />
      </div>
    </div>
  </React.StrictMode>
)
