import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ChecklistPage.css';
import ChecklistProgressBar from './ChecklistComponents/ChecklistProgressBar'
import ChecklistBlurb from './ChecklistComponents/ChecklistBlurb'
import ChecklistList from './ChecklistComponents/ChecklistList';
import { useSelector } from 'react-redux';
function ChecklistPage() {
    const userProgress = useSelector((store) => store.userProgressReducer.progress)
    const day = userProgress[0].day
    console.log(day);
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