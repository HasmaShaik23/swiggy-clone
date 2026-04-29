import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="auth-page-new">
      <div className="auth-card-new">
        <button className="close-auth-new" onClick={() => navigate('/')}>
          <FaTimes />
        </button>
        <h2>Create Account</h2>
        <p>Sign up to get started</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group-new">
            <label>Full Name</label>
            <div className="input-icon-wrapper-new">
              <FaUser className="input-icon-new" />
              <input type="text" placeholder="Enter your full name" required />
            </div>
          </div>
          <div className="form-group-new">
            <label>Email</label>
            <div className="input-icon-wrapper-new">
              <FaEnvelope className="input-icon-new" />
              <input type="email" placeholder="Enter your email" required />
            </div>
          </div>
          <div className="form-group-new">
            <label>Phone Number</label>
            <div className="input-icon-wrapper-new">
              <FaPhone className="input-icon-new" />
              <input type="tel" placeholder="Enter your phone number" required />
            </div>
          </div>
          <div className="form-group-new">
            <label>Password</label>
            <div className="input-icon-wrapper-new">
              <FaLock className="input-icon-new" />
              <input type={showPassword ? "text" : "password"} placeholder="Create a password" required />
              <button type="button" className="password-toggle-new" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="auth-button-new">Sign Up</button>
        </form>
        <p className="auth-footer-new">
          Already have an account? <button onClick={() => navigate('/login')}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;