import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ChecklistBlurb.css';


function ChecklistBlurb({day = 1})  {
    const [stepLabel, setStepLabel] = useState('');
    const [blurbText, setBlurbText] = useState('');
    const [dayValue, setDayValue] = useState(day);
    const step = Math.floor(day / 10) + 1;
    const stepLabelColor = '#363d8e';

    useEffect(() => {
        switch (step) {
          case 1:
            setStepLabel('STEP 1: HYDRATE');
            setBlurbText('Commit to drinking 1 gallon of water daily to refresh your body and boost your energy.');
            break;
          case 2:
            setStepLabel('STEP 2: GROW');
            setBlurbText('Step 1 + 15 minutes of personal development to strengthen your mindset.');
            break;
          case 3:
            setStepLabel('STEP 3: MOVE');
            setBlurbText('Steps 1-2 + Embrace movement with 10,000 daily steps and 1 rest day/week.');
            break;
          case 4:
            setStepLabel('STEP 4: FOCUS');
            setBlurbText('Steps 1-3 + 5 dedicated minutes of meditation to ground yourself with compassion and clarity.');
            break;
          case 5:
            setStepLabel('STEP 5: NOURISH');
            setBlurbText('Steps 1-4 + Follow a meal plan that supports your goals and fuels your body with intention.');
            break;
          default:
            setStepLabel('Hydrate, Grow, Move, Focus, Nourish');
            setBlurbText('+ Unplug from the digital world each evening after dinner.');
        }
      }, [step]); // Dependency on `step`
    



    return (
        <div className = "blurb-container">
            <div className = "step-label">
                <span className='step-name'>{stepLabel}</span>
            </div>
            <div className = "blurb-text-container">
                <span className="blurb-text">
                    {blurbText}
                </span>
            </div>
        </div>
    )
}

export default ChecklistBlurb;