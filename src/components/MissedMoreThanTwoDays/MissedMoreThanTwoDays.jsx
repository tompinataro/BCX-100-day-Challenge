import React from 'react';
import './styles.css';

function MissedMoreThanTwoDays({ onClose }) {
  return (
    <div className="modal-container">
      <h2 className="modal-title">Missed more than 2 Days</h2>
      <p className="modal-description">
        You have missed more than two days. We're bumping you back to the Phase 
        Start View. Take a deep breath and start fresh!
      </p>
      <button className="modal-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default MissedMoreThanTwoDays;
