import ButtonToGo from '../ButtonToGo/ButtonToGo';
import './DoNotCheatYourself.css'
// import image from './fadedRandomDayImage.jpeg';

function DoNotCheatYourself() {
    return (
        <div className="container">
            <h2> DON'T CHEAT YOURSELF </h2>
            <p>  There's no shame in missing a day - it takes strength to acknowledge it.  If today wasn't perfect, own it and start fresh. If you're on track, keep building your momentum. Every choice you make shows your commitment.
            </p>

            {/* <img src={image} alt="Faded Random Day Image" /> */}

            <p className="button-container">
                <ButtonToGo label="START OVER" path="/BCXDayScreen" />
c            </p>
        </div>

    )
}

export default DoNotCheatYourself;

