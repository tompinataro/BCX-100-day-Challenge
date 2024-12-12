// This button is dynamically prop-driven and can be reused to move between views
// Just change the {label and path props}
// label: Customizes the text displayed on the button.
// path: Specifies the route to dynamically control the destination when clicked.

import React from 'react';
import { useHistory } from 'react-router-dom'; //this is being used because React 5.3.4 is in use
// React 6.0 is required to import { useNavigate } from 'react-router-dom'; 
import './ButtonToGo.css/'; 

function ButtonToGo({ label, path }) {
    const history = useHistory();

    return (
        <div>
            <button 
            className="btn-to-go"
            onClick={() => history.push(path)}>
                {label}
            </button>
        </div>
    );
}

export default ButtonToGo;