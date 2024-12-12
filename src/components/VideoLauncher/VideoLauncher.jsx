import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; 
import './VideoLauncher.css';
import VideoPlayer from '../VideoPlayer/VideoPlayer'; 

function VideoLauncher() {
  const [videoUrl, setVideoUrl] = useState(null); 
  const history = useHistory(); 

  // Fetch video URL from the server on component mount
  useEffect(() => {
    const fetchVideoUrl = async () => {
        const response = await fetch('http://localhost:5001/api/phases/video-url');
        const data = await response.json();
          setVideoUrl(data.videoUrl); // Set the fetched video URL
    };
    fetchVideoUrl(); // Fetch video URL when the component mounts
  }, []);
  const handleStartPhase1 = () => {

  };

  return (
    
    <div className="video-launcher-container">
        <button className="start-phase1-btn" onClick={handleStartPhase1}>
        Start Phase 1
      </button>
      <div className="faq-link-container">
        <a href="/faq" className="faq-link">BCX Challenge FAQ</a>
      </div>
      {videoUrl && (
        <div className="video-section">
          <VideoPlayer videoUrl={videoUrl} /> {/* passing the video URL to the VideoPlayer component */}
        </div>
      )}

    
      
    </div>
  );
}

export default VideoLauncher;
