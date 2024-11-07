import React, { useState } from 'react';
import './ForgotPassword.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Simulate sending a password reset email
    setTimeout(() => {
      setMessage('If an account with that email exists, a password reset link has been sent.');
    }, 1000);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group input-icon-container">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              className="form-control"
              placeholder="Your email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn-reset-password">
              Send Reset Link
            </button>
          </div>
        </form>
        {message && <div className="alert-success">{message}</div>}
      </div>
    </div>
  );
}

export default ForgotPassword;
