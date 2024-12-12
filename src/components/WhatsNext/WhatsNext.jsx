import React from "react";
import VideoCreator from "../VideoCreator/VideoCreator";
import './WhatsNext.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ButtonToGo from "../ButtonToGo/ButtonToGo";



function WhatsNext() {
    const history = useHistory();

    const goToPhaseOne = () => {
        history.push("/InstagramView");
    }

    const goToPhaseTwo = () => {
        history.push(`/StepStarterVideo/${id}`);
    }

    return (
        <div className="className=" video-launcher-container>
            <VideoCreator />
            <div className="bottom">
                <h2 className="style">WHAT'S NEXT?</h2>

                <ButtonToGo 
                label="I COMPLETED BCX!" 
                path="/RepeatOrRestart" />

            </div>

        </div >


    )

}

export default WhatsNext;