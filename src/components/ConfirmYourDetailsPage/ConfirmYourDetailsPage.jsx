import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ConfirmYourDetailsPage.css';
import { useDispatch, useSelector } from 'react-redux';
import ButtonToGo from '../ButtonToGo/ButtonToGo';


function ConfirmYourDetailsPage() {
    const history = useHistory();
    const tempUser = useSelector(state => state.userConfirmReducer)
    const dispatch = useDispatch();

    // Can this handle navigate be delayed until USER in logged in?
    const handleNavigate = (event) => {
        registerUser(event)
        history.push('../user');
    };

    // Handle form submission
    const registerUser = (event) => {
        event.preventDefault(); // Prevent form submission from causing page reload or redirect

        // Only dispatch the registration action if all required fields are filled
        if (tempUser.email && tempUser.firstName && tempUser.lastName && tempUser.password && tempUser.timezone) {
            const timezoneProcessed = processTimezone(tempUser.timezone);
                dispatch({
                type: 'REGISTER',
                payload: {
                    email: tempUser.email,
                    first_name: tempUser.firstName,
                    last_name: tempUser.lastName,
                    password: tempUser.password,
                    dayEndTime: timezoneProcessed,
                },
            });
        } else {
            console.log("Form is not complete");
        }
    };

    const processTimezone = (timezone) => {
        //convert EST, MST, CST, PST to dayEndTime
        //dayEndTime = hours from GMT (i.e. CST = 6)
        switch(timezone){
            case 'EST':
                return 7;
            case 'CST':
                return 6;
            case 'MST':
                return 5;
            case 'EST':
                return 4;
            default:
                return 6;
        }
    }

    return (
        <div className="confirm-container">
            <p></p>
            <p> </p>
            <h3>Confirm Your Details</h3>
            <h3>Does this all look correct?</h3>
            {/* Display the user information */}

            <p>Email: {tempUser.email}</p>
            <p>First Name: {tempUser.firstName}</p>
            <p>Last Name: {tempUser.lastName}</p>
            <p>Timezone: {tempUser.timezone}</p>



            <div className="confirm-grid-col grid-col_4 button-container">
                <div>
                    <ButtonToGo
                        path='/register' // Navigate to RegisterPage
                        label='Edit'
                        className='confirm-pink-button'>
                    </ButtonToGo>
                    <button
                        className = 'registerConfirmButton'
                        onClick={handleNavigate}
                        label='Looks Good!'>Looks Good!
                    </button>
                </div>
            </div>


        </div>
    );
}

export default ConfirmYourDetailsPage;
