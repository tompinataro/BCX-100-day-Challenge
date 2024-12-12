// This view promotes the use of Instagram to share the user's progress.
import ButtonToGo from '../ButtonToGo/ButtonToGo';
import "./InstagramView.css"
import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function InstagramView() {
  const { id } = useParams();


  return (
    <div className='Instagram-Parent-Container'>
      <div className='Instagram-Container'>
        <h2>Easily share your progress</h2>
        <h2>to Instagram Stories</h2>
        <h2>right from the BCX 100 app!</h2>

        <img src="/images/Instagram.jpg" alt="BCX and Instagram Image" />
      

          <ButtonToGo
            path={`/StepStarterVideo/${id}`}
            label='START PHASE ONE' />
      </div>
    </div >

  )
}

export default InstagramView;