import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './RegisterForm.css';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [timezone, setTimezone] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  // // Handle form submission
  const setTempUser = (event) => {
    event.preventDefault(); // Prevent form submission from causing page reload or redirect

    // Only dispatch the registration action if all required fields are filled
    if (email && firstName && lastName && password && timezone) {
      dispatch({
        type: 'SET_TEMP_USER',
        payload: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          timezone: timezone,
        },
      });
    } else {
      console.log("Form is not complete");
    }
  };


  // // // Handle form submission
  // const registerUser = (event) => {
  //   event.preventDefault(); // Prevent form submission from causing page reload or redirect

  //   // Only dispatch the registration action if all required fields are filled
  //   if (email && firstName && lastName && password && timezone) {
  //     dispatch({
  //       type: 'REGISTER',
  //       payload: {
  //         email: email,
  //         first_name: firstName,
  //         last_name: lastName,
  //         password: password,
  //         timezone: timezone,
  //       },
  //     });
  //   } else {
  //     console.log("Form is not complete");
  //   }
  // };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  const handleTimezoneSelect = (timezone) => {
    setTimezone(timezone);
    setDropdownOpen(false); // Close the dropdown after selection
  };

  const history = useHistory();
  const handleNavigate = (event) => {
    setTempUser(event)
    { history.push('/ConfirmYourDetailsPage') }
  }

  return (

    <form className="formPanel" onSubmit={handleNavigate}  >
      <h2>Please Register</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}

      <div className="formGroup">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          required
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          required
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="formGroup">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="formGroup">
        <label htmlFor="timezone">Timezone:</label>
        <div className="dropdown">
          <button 
            type="button" 
            onClick={toggleDropdown} 
            className="dropbtn"  
          >
            {timezone || 'Select Timezone'}
          </button>

          {dropdownOpen && (
            <div className="dropdown-content">
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleTimezoneSelect('EST'); }}>EST</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleTimezoneSelect('CST'); }}>CST</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleTimezoneSelect('MST'); }}>MST</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleTimezoneSelect('PST'); }}>PST</a></li>
              </ul>
            </div>
            
          )}
        </div>
      </div>

      <div>
        <button
          className="butn"
          type="submit"
          name="submit"
          onClick={handleNavigate}
          value="Register">Submit</button>
      </div>
    </form>

  )};

export default RegisterForm;
