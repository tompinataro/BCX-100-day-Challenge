import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './UserPage.css';

function UserPage() {
  // Access user info from the Redux store
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const userId = user.id;
  const userProgress = useSelector((store) => store.userProgressReducer.progress);


  //<Link to={`/PhotoUpload/${user.id}`}>
  //<h2>Click here</h2>
  //<h2>begin your Journey!</h2>
  //</Link>
  const handleNav = () => {
    console.log('handling nav!');
    if(typeof userProgress !== 'undefined'){
      if(userProgress[0].step == 0){
        //case: new user
        history.push(`/PhotoUpload/${user.id}`)
        console.log('step 0!');
      }
      else if(userProgress[0].warning){
        //case:user needs to go to MissedDayView
        history.push(`/MissedDayView/${user.id}`)
        console.log('warn screen!');
      }
      else if((userProgress[0].day % 10 == 0) && (userProgress[0].day < 61)){
        //case: user needs to go to stepStarterVideo
        history.push(`/StepStarterVideo/${user.id}`)
        console.log('new step time!');
      }
      else{
        //case: user needs to go to checklistPage
        history.push('/main');
        console.log('boring');
      }
    } 
    else {console.log('userProgress not present in handleNav of UserPage')}
  }

  useEffect(() => {
    if (userId && typeof(userProgress == 'undefined')) {
      dispatch({ type: 'FETCH_USER_PROGRESS', payload: userId });
    }
  }, [dispatch, user, userId]);
  return (
    <div className="userPageContainer">
      {/* Personalized Welcome Message with clickable text link */}
      <h2>
        Welcome, {user.first_name}!
        <span onClick={handleNav}>
          <h2 className='underlinePink'>Click here to improve your confidence!</h2>
        </span>
      </h2>
      {/* <p>Your ID is: {user.id}</p> */}
      
      {/* Log Out Button */}
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

export default UserPage;
