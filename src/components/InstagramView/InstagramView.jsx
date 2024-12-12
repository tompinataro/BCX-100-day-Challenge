// This view promotes the use of Instagram to share the user's progress.
import ButtonToGo from '../ButtonToGo/ButtonToGo';
import "./InstagramView.css"
import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function InstagramView() {
  const { id } = useParams();


  return (
    <div>

      <div className="image-container">
        <img src="/images/Instagram.jpg" alt="BCX and Instagram Image" />

      </div>
      <div className="background-color">

        <div id='Instagram-Container'>
          <p>Easily share your progress</p>
          <p>to Instagram Stories</p>
          <p>right from the BCX 100 app!</p>

        </div>

        <div className='Instagram-Button-Container '>
          <ButtonToGo
            path={`/StepStarterVideo/${id}`}
            label='START PHASE ONE' />
        </div>

      </div>
    </div >

  )
}

export default InstagramView;