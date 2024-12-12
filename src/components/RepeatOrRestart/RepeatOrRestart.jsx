import ButtonToGo from '../ButtonToGo/ButtonToGo';
// import image from './fadedRandomDayImage.jpeg';

function RepeatOrRestart() {

    return (

        <div className="container">
            <h3> CELEBRATE & KEEP GROWING </h3>
            <p>  Whether you want to build on the momentum you've already created or reset with fresh energy by starting Phase 1 again, the choice is yours.
            </p>

            {/* <img src={image} alt="Faded Random Day Image" /> */}

            <ButtonToGo label="REPEAT PHASE 1" path="/InstagramView" />
            <ButtonToGo label="RESTART PHASE 2" path="/main" />

        </div>
    )
}

export default RepeatOrRestart;