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
          <span style={{ fontSize: '10px',paddingTop:'10px', marginLeft:'15px' }}>{label}</span>
        
      </div>
     
    );
  
  }

  return <div style={{ display: 'flex', marginTop:'450px', backgroundColor:'rgba(255, 192, 203, 0.205)',height:'160px'}}>{boxes}</div>;
};

export default ProgressBar;
