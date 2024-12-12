import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import ButtonToGo from "../ButtonToGo/ButtonToGo";

function StepStarterVideo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userProgress = useSelector((store) => store.userProgressReducer.progress);
  const stepData = useSelector((store) => store.stepsReducer.steps);
  console.log('stepdata', stepData)

  useEffect(() => {
    console.log('Ima here')
    // Dispatch action to fetch user progress for the given step id
    console.log('id at step started before sending', id)
    dispatch({ type: 'FETCH_USER_PROGRESS', payload: id });
  }, [dispatch, id]);

  useEffect(() => {
    if (userProgress.length > 0) {
      const stepId = userProgress[0].step; // Extract stepId from user progress
      console.log('step id at step started video before sending to router', stepId)
      if (stepId == 0){
        dispatch({ type: 'FETCH_STEPS', payload: 1 }); // Fetch step data
      }
      else{
        dispatch({ type: 'FETCH_STEPS', payload: stepId }); // Fetch step data
      }
    }
  }, [dispatch, userProgress]);

  //const currentStep = stepData
  //console.log('Current step data:', currentStep);
  //console.log('my step',stepData.stepData.step_text)
  return (
    <div className="video-launcher-container">
      {stepData?.videoUrl && <VideoPlayer videoUrl={stepData?.videoUrl} />}
      {console.log(stepData?.stepData)}
      <div className="step-info">
        <h3>Step{stepData?.stepData?.stepid}: {stepData?.stepData?.step_text}</h3>
      </div>

      <div className="bottom">
        
        <ButtonToGo
          label={`START STEP ${stepData?.stepData?.stepid}`}
          path="/main" />

        <div className="faq-link-container">
          <a href="/faq" className="faq-link">BCX Challenge FAQ</a>
        </div>
      </div>
    </div>
  );
}

export default StepStarterVideo;
