import React from 'react';

function VideoPlayer({ videoUrl }) {
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
