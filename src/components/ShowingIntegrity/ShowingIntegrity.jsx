import ButtonToGo from '../ButtonToGo/ButtonToGo';
import { useParams } from "react-router-dom";

function ShowingIntegrity() {
    const { id } = useParams(); 

    return (

        <div className="container">
            <h3> You Are Showing Integrity </h3>
            <p> Starting over takes strength. You're showing integrity and taking ownership of your journey - this is what real progress looks like. Keep going with purpose.
            </p>

            {/* <img src="../../Images/MissedDayImage.jpeg" alt="Faded Random Day Image" /> */}

            <ButtonToGo label="OOPS! I DID FINISH" path="/main" />
            <ButtonToGo label="START OVER" path={`/StepStarterVideo/${id}`}/>

        </div>
    )
}
export default ShowingIntegrity;