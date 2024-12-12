import React from "react";
import VideoCreater from "../VideoCreater/VideoCreater";
import './VideoLauncher.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function VideoLauncher() {
  const history = useHistory();
  const { id } = useParams();
  const goToInstagram = () => {
    history.push(`/InstagramView/${id}`);
  }

  return (
    <div className="video-launcher-container">
      <VideoCreater />
      <div className="bottom">
        <button className="btn" onClick={goToInstagram}>
          START THE CHALLENGE
        </button>
        <div className="faq-link-container">
          <a href="/faq" className="faq-link">BCX Challenge FAQ</a>
        </div>
      </div>
    </div>
  );
}

export default VideoLauncher;
