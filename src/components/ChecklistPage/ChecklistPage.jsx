import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ChecklistPage.css';
import ChecklistProgressBar from './ChecklistComponents/ChecklistProgressBar'
import ChecklistBlurb from './ChecklistComponents/ChecklistBlurb'
import ChecklistList from './ChecklistComponents/ChecklistList';
function ChecklistPage() {
    const day=18;
    return(
        <div className='checklistContainer'>
            <span className='dayDisplay'>DAY {day} </span>
            <ChecklistProgressBar day={day}/>
            <ChecklistBlurb day={day} />
            <ChecklistList day={day} />
        </div>
        
    )
}

export default ChecklistPage