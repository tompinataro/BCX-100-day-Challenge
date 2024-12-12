import ButtonToGo from '../ButtonToGo';
import image from './images/MissedDayImage.jpeg';

<div>
<h2> What Happened? </h2>
<p> Let's check in.  Did you complete today's steps but forget to submit your photo, or is it time to reset and rebuild?
</p>

<img src={image} alt="Missed Day Image" />

<ButtonToGo label="I FORGOT TO CHECK IN" path="../___________"/>
<ButtonToGo label="TIME TO RESET" path="../ShowingIntegrity"/>

</div>

export default MissedDayView;
