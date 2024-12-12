import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import './StepStarterVideo.css';

function StepStarterVideo() {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  
  const userProgress = useSelector((store) => store.userProgressReducer.progress);
  const stepData = useSelector((store) => store.stepsReducer.steps);
  console.log ('stepdata', stepData)
  
  useEffect(() => {
    console.log ('Ima here')
    // Dispatch action to fetch user progress for the given step id
  console.log('id at step started before sending', id)
    dispatch({ type: 'FETCH_USER_PROGRESS', payload: id });
  }, [dispatch, id]);

  useEffect(() => {
    if (userProgress.length > 0) {
      const stepId = userProgress[0].step; // Extract stepId from user progress
      console.log('step id at step started video before sending to router', stepId)
      dispatch({ type: 'FETCH_STEPS', payload: stepId }); // Fetch step data
    }
  }, [dispatch, userProgress]);
  
  
  return (
    <div className="video-launcher-container">
        <VideoPlayer videoUrl={stepData.videoUrl} />
        
     

      <div className="bottom">
      <div className="step-info">
        <h3>Step {stepData?.stepData?.stepid}: {stepData?.stepData?.step_text} </h3>
      </div>
        <button className="btn">
          START STEP {stepData.stepid}
        </button>
        <div className="faq-link-container">
          <a href="/faq" className="faq-link">BCX Challenge FAQ</a>
        </div>
      </div>
    </div>
  );
}

export default StepStarterVideo;
