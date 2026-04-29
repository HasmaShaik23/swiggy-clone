import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaTimes, FaArrowLeft } from 'react-icons/fa';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setError('Please enter your email address');
      return;
    }
    if (!forgotEmail.includes('@') || !forgotEmail.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }
    // Simulate sending email
    setEmailSent(true);
    setError('');
    // Clear form after 3 seconds
    setTimeout(() => {
      setShowForgotPassword(false);
      setForgotEmail('');
      setEmailSent(false);
    }, 3000);
  };

  return (
    <>
      {!showForgotPassword ? (
        <div className="auth-page-new">
          <div className="auth-card-new">
            <button className="close-auth-new" onClick={() => navigate('/')}>
              <FaTimes />
            </button>
            <h2>Welcome Back</h2>
            <p>Sign in to continue</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group-new">
                <label>Email</label>
                <div className="input-icon-wrapper-new">
                  <FaEnvelope className="input-icon-new" />
                  <input type="email" placeholder="Enter your email" required />
                </div>
              </div>
              <div className="form-group-new">
                <label>Password</label>
                <div className="input-icon-wrapper-new">
                  <FaLock className="input-icon-new" />
                  <input type={showPassword ? "text" : "password"} placeholder="Enter your password" required />
                  <button type="button" className="password-toggle-new" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="forgot-password-link">
                <button type="button" onClick={() => setShowForgotPassword(true)}>
                  Forgot Password?
                </button>
              </div>
              <button type="submit" className="auth-button-new">Login</button>
            </form>
            <p className="auth-footer-new">
              Don't have an account? <button onClick={() => navigate('/signup')}>Sign Up</button>
            </p>
          </div>
        </div>
      ) : (
        <div className="auth-page-new">
          <div className="auth-card-new forgot-card">
            <button className="back-to-login" onClick={() => {
              setShowForgotPassword(false);
              setForgotEmail('');
              setEmailSent(false);
              setError('');
            }}>
              <FaArrowLeft /> Back to Login
            </button>
            <h2>Forgot Password?</h2>
            <p>Enter your email address and we'll send you a link to reset your password.</p>
            
            {emailSent ? (
              <div className="email-sent-message">
                <div className="success-icon">✓</div>
                <h3>Email Sent!</h3>
                <p>We've sent a password reset link to</p>
                <p className="sent-email">{forgotEmail}</p>
                <p className="check-spam">Please check your inbox (and spam folder)</p>
                <button className="back-to-login-btn" onClick={() => {
                  setShowForgotPassword(false);
                  setForgotEmail('');
                  setEmailSent(false);
                }}>
                  Back to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword}>
                <div className="form-group-new">
                  <label>Email Address</label>
                  <div className="input-icon-wrapper-new">
                    <FaEnvelope className="input-icon-new" />
                    <input 
                      type="email" 
                      placeholder="Enter your registered email" 
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="error-message">{error}</p>}
                </div>
                <button type="submit" className="auth-button-new">Send Reset Link</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;