import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ username: '', email: '', password: '' });

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!username) {
      errors.username = 'Username is required';
      formIsValid = false;
    }

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <div className="text-center">
          <p>Create an account on <span className="bold-text">Bee Finance</span></p>
        </div>
        <div className="form-group">
          <button className="btn-fullwidth" onClick={() => navigate('/dashboard')}>
            <FontAwesomeIcon icon={faGoogle} className="icon" />
            Sign up with Google
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group input-icon-container">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input
              type="text"
              className={`form-control ${error.username ? 'is-invalid' : ''}`}
              placeholder="Your username"
              aria-label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {error.username && <div className="invalid-feedback">{error.username}</div>}
          </div>
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
              Sign up <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          {loading && <div>Loading...</div>}
        </form>
        <div className="text-center">
          <p>Already have an account? <Link to="/" className="dark-link">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;