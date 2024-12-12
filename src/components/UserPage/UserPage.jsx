import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import LogOutButton from '../LogOutButton/LogOutButton';
import './UserPage.css';

function UserPage() {
  // Access user info from the Redux store
  const user = useSelector((store) => store.user);  

  return (
    <div className="userPageContainer">
      {/* Personalized Welcome Message with clickable text link */}
      <h2>
        Welcome, {user.first_name} 
        <Link to={`/PhotoUpload/${user.id}`}>
        <h2>Click here</h2>
        <h2>begin your Journey!</h2>
        </Link>
      </h2>
      {/* <p>Your ID is: {user.id}</p> */}
      
      {/* Log Out Button */}
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

export default UserPage;
