import React from 'react';
import { useHistory } from 'react-router-dom'; //this is being used because React 5.3.4 is in use
// import { useNavigate } from 'react-router-dom'; React 6.0 is required for this
import './NavigationButtons.css'; 

function NavigationButtons() {
    const history = useHistory();

    return (
        <div>
            <button
                onClick={() => history.push('/RegisterPage')} // Navigate to RegisterPage
            > Edit
            </button>
            <button
                onClick={() => history.push('/PhotoUpload')} // Navigate to PhotoUpload
            > Looks Good!
            </button>
        </div>
    );
}

export default NavigationButtons;