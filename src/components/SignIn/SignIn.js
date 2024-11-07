import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignIn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: '', password: '' });

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!email) {
      errors.email = 'Email is required';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
      formIsValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      formIsValid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      formIsValid = false;
    }

    setError(errors);
    return formIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (validateForm()) {
      console.log('Form is valid');
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 2000);
    } else {
      console.log('Form has errors');
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log('Google login successful:', response);
    navigate('/dashboard');
  };

  const handleGoogleLoginFailure = (response) => {
    console.error('Google login failed:', response);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <div className="text-center">
          <p>Log in to <span className="bold-text">Flouz Keroz</span></p>
        </div>
        <GoogleOAuthProvider clientId="1053371301699-bf95gl141s7rc1aq1vodr7juppltblof.apps.googleusercontent.com">
          <div className="form-group google-login">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              render={(renderProps) => (
                <button className="btn-fullwidth" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  <FontAwesomeIcon icon={faGoogle} className="icon" />
                  Login with Google
                </button>
              )}
            />
          </div>
        </GoogleOAuthProvider>
        <form onSubmit={handleSubmit}>
          <div className="form-group input-icon-container">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              className={`form-control ${error.email ? 'is-invalid' : ''}`}
              placeholder="Your email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error.email && <div className="invalid-feedback">{error.email}</div>}
          </div>
          <div className="form-group input-icon-container">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${error.password ? 'is-invalid' : ''}`}
              placeholder="Your password"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="toggle-password" onClick={togglePasswordVisibility} />
            {error.password && <div className="invalid-feedback">{error.password}</div>}
          </div>
          <div className="form-group">
            <button type="submit" className="btn-login" disabled={loading}>
              Log in <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          {loading && <div>Loading...</div>}
        </form>
        <div className="text-center">
          <Link to="/forgot-password" className="forgot-password dark-link">Forgot password?</Link>
          <p>Don’t have an account? <Link to="/signUp" className="dark-link">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
