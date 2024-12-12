import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ChecklistProgressBar.css';

function ChecklistProgressBar({day = 1})  {
    const [dayValue, setDayValue] = useState(day);
    const step = Math.floor(dayValue / 10) + 1;
    const progressBarColor = '#4853d4'
    let progressBarLabel = ''
    if(day < 50){
        progressBarLabel = 'BUILD'
    }
    else{
        progressBarLabel = 'CONSISTENCY'
    }



    return (
        <div className = "progress-container-cl">
            <div className = "progress-label">
                <span className='progress-label'>{progressBarLabel}</span>
            </div>
            <div className = "progress-bar"
            style={{width: `${(day / 100) * 100}%` , backgroundColor: progressBarColor} }>
                
            </div>
        </div>
    )
}

export default ChecklistProgressBar;