// This view promotes the use of Instagram to share the user's progress.
import ButtonToGo from '../ButtonToGo/ButtonToGo';
// Declare label and path variables directly inline as props.
// In this file - see line 16 <ButtonToGo...
import image from './images/BCX_and_Instagram.jpeg';

<div>
<h2>
    Easily share you progress to
    Instagram Stories
    straight from the app!
</h2>

<img src={image} alt="BCX and Instagram" />

<ButtonToGo label="START PHASE ONE" path="../PhaseOnePage"/>

</div>

export default InstagramView;
