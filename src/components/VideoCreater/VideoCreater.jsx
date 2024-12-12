import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; 

import VideoPlayer from '../VideoPlayer/VideoPlayer'; 

function VideoCreater(){
    const [videoUrl, setVideoUrl] = useState(null); 
  const history = useHistory(); 
  // Fetch video URL from the server on component mount
  useEffect(() => {
    const fetchVideoUrl = async () => {
        const response = await fetch('http://localhost:5001/api/phases/intro-video-url');
        const data = await response.json();
          setVideoUrl(data.videoUrl); // Set the fetched video URL
    };
    fetchVideoUrl(); // Fetch video URL when the component mounts
  }, []);
  useEffect(() => {
    const fetchVideoUrl = async () => {
        const response = await fetch('http://localhost:5001/api/phases/completion-video-url');
        const data = await response.json();
          setVideoUrl(data.videoUrl); // Set the fetched video URL
    };
    fetchVideoUrl(); // Fetch video URL when the component mounts
  }, []);
  
return(

    <div>
        {videoUrl && (
        <div className="video-section">
          <VideoPlayer videoUrl={videoUrl} /> {/* passing the video URL to the VideoPlayer component */}
        </div>
      )}

    </div>
)


}

export default VideoCreater