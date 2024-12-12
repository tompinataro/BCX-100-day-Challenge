import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ value }) => {
  const boxes = [];
  

  for (let i = 0; i < 7; i++) {
    let label;
    let backgroundColor;

   
    if (i === 0) {
      label = 'Phase1';
      backgroundColor = ''; 
    } else if (i === 6) {
      label = 'Phase2';
      backgroundColor = ''; 
    } else {
      label = `Step ${i}`;
    
      backgroundColor = i <= value ? 'pink' : ''; 
    }
  

    boxes.push(
  
      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '7px' }}>
        <div
          style={{
            width: '30px',
            height: '30px',
            border: '2px solid rgba(235, 165, 226, 0.699)',
            borderRadius: '5px',
            backgroundColor: backgroundColor,
            marginLeft:'-5px', 
          }}
        />
          <span style={{ marginTop: '0px', fontSize: '10px',marginTop:'8px' }}>{label}</span>
        
      </div>
    
    );
  
  }

  return <div style={{ display: 'flex' }}>{boxes}</div>;
};

export default ProgressBar;
