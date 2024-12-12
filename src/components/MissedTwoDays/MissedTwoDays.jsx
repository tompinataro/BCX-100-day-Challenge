function MissedTwoDays({ onClose }) {
    return (
      <div className="modal-container">
        <h2 className="modal-title">Missed Two Days</h2>
        <p className="modal-description">
          You have missed two days. We're bumping you back to the Step Start View. 
          Keep going and regain your momentum!
        </p>
        <button className="modal-button" onClick={onClose}>
          Close
        </button>
      </div>
    );
  }
  
  export default MissedTwoDays;