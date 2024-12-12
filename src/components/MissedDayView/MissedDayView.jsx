import ButtonToGo from '../ButtonToGo/ButtonToGo';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
function MissedDayView() {
    const id = useParams;

    return (
        <div className="container">

            <h2> What Happened? </h2>
            <p> Let's check in.  Did you complete today's steps but forget to submit your photo, or is it time to reset and rebuild?
            </p>

            {/* <img src="../Images/MissedDayImage.jpeg" alt="An illustration of a missed day" /> */}
           
            {/* <div className="background">
                <h1 style={{ color: 'white', textAlign: 'center', paddingTop: '20px' }}>
                </h1>
            </div> */}
            
            <ButtonToGo label="I FORGOT TO CHECK IN" path="/main" />
            <ButtonToGo label="TIME TO RESET" path={`/ShowingIntegrity/${id}`}   />

        </div>
    )
}

export default MissedDayView;