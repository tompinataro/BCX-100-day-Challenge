import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome to BCX');
  const history = useHistory();

  // Handle login navigation
  const onLogin = () => {
    history.push('/login');
  };

  // Handle new profile navigation
  const onCreateProfile = () => {
    history.push('/registration');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div >
        <div>
          <p>
            Over the next 100 days, you will develop the grit, self-confidence, and fortitude you need in every area of life. It's not going to be easy, but well worth it!
          </p>
        </div>
        <div>
          {/* Buttons below the paragraph */}
          <div >
            <button  onClick={onCreateProfile}>
              Create a New Profile
            </button>
            <button  onClick={onLogin}>
              Login to Existing Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
