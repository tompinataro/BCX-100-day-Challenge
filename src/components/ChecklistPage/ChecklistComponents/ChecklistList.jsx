import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ChecklistList.css';


function ChecklistList({day = 1})  {
    const [checkListDisabled, setCheckListDisabled] = useState([false, true, true, true, true, true, true]);

    const step = Math.floor(day / 10) + 1;
    //the checklistdisabled array must be initialized in this clunky way because step 5 has 2 associated checkboxes
    useEffect(() => {
        switch (step) {
          case 1:
            setCheckListDisabled([false, true, true, true, true, true, true])
            break;
          case 2:
            setCheckListDisabled([false, false, true, true, true, true, true])
            break;
          case 3:
            setCheckListDisabled([false, false, false, true, true, true, true])
            break;
          case 4:
            setCheckListDisabled([false, false, false, false, true, true, true])
            break;
          case 5:
            setCheckListDisabled([false, false, false, false, false, false, true])
            break;
          default:
            setCheckListDisabled([false, false, false, false, false, false, false])
        }
      }, [step]); // Dependency on `step`
    



    return (
        <div className = "list-container">
            <label className='custom-checkbox'> 
                <input type="checkbox" disabled={checkListDisabled[0]} />
                <span className="checkmark"></span>
                <span className='checklist-text'>Drink 1 Gallon of Water</span>
            </label>
            <label className='custom-checkbox'> 
                <input type="checkbox" disabled={checkListDisabled[1]} />
                <span className="checkmark" ></span>
                <span className='checklist-text' >15 Minutes of PD</span>
            </label>
            <label className='custom-checkbox'> 
                <input type="checkbox" disabled={checkListDisabled[2]} />
                <span className="checkmark"></span>
                <span className='checklist-text'>10K Steps</span>
            </label>
            <label className='custom-checkbox'> 
                <input type="checkbox" disabled={checkListDisabled[3]} />
                <span className="checkmark"></span>
                <span className='checklist-text'>5 Minutes of Meditation</span>
            </label>
            <label className='custom-checkbox'> 
                <input type="checkbox" disabled={checkListDisabled[4]} />
                <span className="checkmark"></span>
                <span className='checklist-text'>Follow a Meal Plan</span>
            </label>
            <label className='custom-checkbox'> 
                <input type="checkbox" disabled={checkListDisabled[5]} />
                <span className="checkmark"></span>
                <span className='checklist-text'>No Alcohol & No Treats</span>
            </label>
            <label className='custom-checkbox'> 
                <input type="checkbox" disabled={checkListDisabled[6]} />
                <span className="checkmark"></span>
                <span className='checklist-text'>Unplug & Done</span>
            </label>
        </div>
    )
}

export default ChecklistList;