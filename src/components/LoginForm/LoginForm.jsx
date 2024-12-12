import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Login.css';


function LoginForm() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);  
 
  const login = (event) => {
    
    event.preventDefault();
    

    if (email && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          email: email,
          password: password,
        },
       
      })
      //
      console.log('user id at login page',user.id);
      //history.push('/PhotoUpload/${user.id}');
      history.push('/user');
    //
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  
  
  return (
    <form className="login-form-container" onSubmit={login}>
  <h2 className = "name">Login</h2>
  {errors.loginMessage && (
    <h3 className="login-form-alert" role="alert">
      {errors.loginMessage}
    </h3>
  )}
  <div>
    <label htmlFor="email" className="login-form-label">
      Email:
      <input
        type="text"
        name="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="login-form-inputt"
      />
    </label>
  </div>
  <div>
    <label htmlFor="password" className="login-form-label">
      Password:
      <input
        type="password"
        name="password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="login-form-inputt"
      />
    </label>
  </div>
  <div>
    <input
      className="loginn-form-button"
      type="submit"
      name="submit"
      value="Log In"
    />
  </div>
</form>

  );
}

export default LoginForm;

