import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import LogOutButton from '../LogOutButton/LogOutButton';

function UserPage() {
  // Access user info from the Redux store
  const user = useSelector((store) => store.user);  

  return (
    <div className="container">
      {/* Welcome message with a clickable link */}
      <h2>
        Welcome,{' '}
        <Link to={`/PhotoUpload/${user.id}`}>Let's begin the Journey</Link>
      </h2>
      <p>Your ID is: {user.id}</p>
      
      {/* Log Out Button */}
      <LogOutButton className="btn" />
    </div>
  );
}

export default UserPage;
