import React from 'react';
import './RegisterPage.css';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();
// console.log ("Hit registration")
  return (
    <div className="container">
      <RegisterForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Existing Account? 
          Click Here.
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
