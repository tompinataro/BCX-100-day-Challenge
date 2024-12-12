import React, { useState, useEffect } from "react";
import './WhatsNext.css';
import VideoPlayer from '../VideoPlayer/VideoPlayer'; 

function WhatsNext({ phaseId }) {
  const [videoUrl, setVideoUrl] = useState(null);  // Store the signed video URL
  const [isVideoLoaded, setIsVideoLoaded] = useState(false); // Flag to track if the video is loaded
  const [isPlaying, setIsPlaying] = useState(false); // Flag to track if the video is playing

  // Fetch the completion video URL when component mounts or phaseId changes
  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await fetch(`/api/video-url?phaseId=${phaseId}`);
        const data = await response.json();

        if (data.videoUrl) {
          setVideoUrl(data.videoUrl); // Set the video URL
          setIsVideoLoaded(true); // Set video loaded flag to true
        }
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };

    // Fetch video URL for the completion video
    fetchVideoUrl();
  }, [phaseId]); // Re-fetch video URL if phaseId changes

  // Handle play button click
  const handlePlayClick = () => {
    setIsPlaying(true); // Change state to show the video
  };

  return (
    <div>
      <div className="part1">
        {/* Play Button */}
        <button 
          className="playbtn" 
          onClick={handlePlayClick}
          disabled={isPlaying} // Disable the button once the video starts playing
        >
          {isPlaying ? '▶️ Playing' : '▶️'} {/* Change text to 'Playing' when video starts */}
        </button>
      </div>

      <div className="part2">
        <h5 className="Whatsnext">WHAT'S NEXT?</h5>
        <button className="startbtn">I COMPLETED BCX</button>
      </div>

      {/* Video player section */}
      {isVideoLoaded && isPlaying && (
        <div className="video-section">
          <VideoPlayer videoUrl={videoUrl} /> {/* Render video once URL is loaded */}
        </div>
      )}
    </div>
  );
}

export default WhatsNext;
