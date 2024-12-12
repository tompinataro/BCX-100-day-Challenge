import ButtonToGo from '../ButtonToGo/ButtonToGo';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import "./MissedDayView.css";

function MissedDayView() {
    const id = useParams;

    return (
        <div>
        <div className='background'>
            <div className="Missed-Container">

                <h2 id="WH"> WHAT HAPPENED? </h2>
               
                <p id="PWH" >Let's check in. Did you complete today's steps but forget to submit your photo, 
                    or is it time to reset and rebuild?
                </p>
            
                <ButtonToGo label="I FORGOT TO CHECK IN" path="/main" />
                <ButtonToGo label="TIME TO RESET" path={`/ShowingIntegrity/${id}`} />
            </div>
            </div>
        </div>
    )
}

export default MissedDayView;