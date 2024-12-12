import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ChecklistList.css';
import axios from 'axios';
import { useSelector } from 'react-redux';


function ChecklistList({day = 1})  {
    const [checkListDisabled, setCheckListDisabled] = useState([false, true, true, true, true, true, true]);
    const history = useHistory();
    const user = useSelector((state) => state.user);
    const step = Math.floor(day / 10) + 1;
    const [enabledHabits, setEnabledHabits] = useState([]);
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

        console.log(enabledHabits.length)
        if((step < 5 && enabledHabits.length == step) || (enabledHabits.length >= step + 1)){
          history.push('/BCXDayScreen');
        }
      }, [step, enabledHabits]); 
    

    const handleCheck =async (event, habit) =>  {
      if(event.target.checked !== undefined) {
        console.log(habit);
        console.log(event.target.checked);
        if(event.target.checked){
          if(habit == 'daily_nourish1'){
            if(enabledHabits.includes('daily_nourish2')){
              await axios.post('/api/userprogress/setHabit', {
                habit: 'daily_nourish',
                truefalse: true,
                id: user.id
              });
              setEnabledHabits(prev => [...prev, 'daily_nourish1']);
            }
            else{
              setEnabledHabits(prev => [...prev, 'daily_nourish1']);
            }
          }
          else if(habit == 'daily_nourish2'){
            if(enabledHabits.includes('daily_nourish1')){
              //only send nourish if 4 and 5 are both completed
              await axios.post('/api/userprogress/setHabit', {
                habit: 'daily_nourish',
                truefalse: true,
                id: user.id
              });
              setEnabledHabits(prev => [...prev, 'daily_nourish2']);
            }
            else{
              setEnabledHabits(prev => [...prev, 'daily_nourish2']);
            }
          }
          else {
            await axios.post('/api/userprogress/setHabit', {
              habit: habit,
              truefalse: true,
              id: user.id
            })
            setEnabledHabits(prev => [...prev, habit]);
          }
        }
        else if (!event.target.checked){
          if(habit == 'daily_nourish1' || habit == 'daily_nourish2'){
            await axios.post('/api/userprogress/setHabit', {
              habit: 'daily_nourish',
              truefalse: false,
              id: user.id
            });
            setEnabledHabits(enabledHabits => enabledHabits.filter(item => item !== habit))
          }
          else {
            await axios.post('/api/userprogress/setHabit', {
              habit: habit,
              truefalse: false,
              id: user.id
            });
            setEnabledHabits(enabledHabits => enabledHabits.filter(item => item !== habit))
          }
        }
      }
    }


    return (
        <div className = "list-container">
            <label className='custom-checkbox' onClick={() => {handleCheck(event, 'daily_hydrate')}}> 
                <input type="checkbox" disabled={checkListDisabled[0]} />
                <span className="checkmark"></span>
                <span className='checklist-text' disabled={checkListDisabled[0]}>Drink 1 Gallon of Water</span>
            </label>
            <label className='custom-checkbox' onClick={() => {handleCheck(event, 'daily_grow')}}> 
                <input type="checkbox" disabled={checkListDisabled[1]} />
                <span className="checkmark" ></span>
                <span className='checklist-text' disabled={checkListDisabled[1]}>15 Minutes of PD</span>
            </label>
            <label className='custom-checkbox' onClick={() => {handleCheck(event, 'daily_move')}}> 
                <input type="checkbox" disabled={checkListDisabled[2]} />
                <span className="checkmark"></span>
                <span className='checklist-text'>10K Steps</span>
            </label>
            <label className='custom-checkbox' onClick={() => {handleCheck(event, 'daily_focus')}}> 
                <input type="checkbox" disabled={checkListDisabled[3]} />
                <span className="checkmark"></span>
                <span className='checklist-text'>5 Minutes of Meditation</span>
            </label>
            <label className='custom-checkbox' onClick={() => {handleCheck(event, 'daily_nourish1')}}> 
                <input type="checkbox" disabled={checkListDisabled[4]} />
                <span className="checkmark"></span>
                <span className='checklist-text'>Follow a Meal Plan</span>
            </label>
            <label className='custom-checkbox' onClick={() => {handleCheck(event, 'daily_nourish2')}}> 
                <input type="checkbox" disabled={checkListDisabled[5]} />
                <span className="checkmark"></span>
                <span className='checklist-text'>No Alcohol & No Treats</span>
            </label>
            <label className='custom-checkbox' onClick={() => {handleCheck(event, 'daily_dinner')}}> 
                <input type="checkbox" disabled={checkListDisabled[6]} />
                <span className="checkmark"></span>
                <span className='checklist-text'>Unplug & Done</span>
            </label>
        </div>
    )
}

export default ChecklistList;