import React from 'react';
import { useEffect } from 'react';

function VideoPlayer({ videoUrl }) {

  useEffect(() => {
    console.log('new URL recieved', videoUrl);
  }, [videoUrl]);

  return (
    <div className="video-player-container">
      <video controls width="100%">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
