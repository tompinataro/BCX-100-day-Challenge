import React from "react";
import "./BCXDayScreen.css"; // Include this file for styling

function BCXDayScreen(){
  return (
    <div className="bcx-container">
      <header className="bcx-header">
        <h1 className="bcx-day">DAY 12</h1>
      </header>
      <div className="bcx-progress-bar">
        <div className="progress"></div>
      </div>
      <div className="bcx-tasks">
        <div className="task-row">
          <span className="task active">💧 1 GALLON OF WATER</span>
          <span className="task">🧘 5 MIN. MEDITATION</span>
        </div>
        <div className="task-row">
          <span className="task active">🧠  15 MIN. OF PD</span>
          <span className="task">🍽️   FOLLOW A MEAL PLAN</span>
        </div>
        <div className="task-row">
          <span className="task">🚶‍♂️ 10K STEPS</span>
          <span className="task">🌐 UNPLUG & DONE</span>
        </div>
      </div>
      <section className="bcx-build">
        <h3 className="build-title">BUILD</h3>
        <div className="build-category">
          <span className="category-title">💧 HYDRATE</span>
          <div className="category-bar">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="bar filled"></div>
            ))}
          </div>
        </div>
        <div className="build-category">
          <span className="category-title">🧠 GROW</span>
          <div className="category-bar">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className={`bar ${i < 3 ? "filled" : ""}`}></div>
            ))}
          </div>
        </div>
        <div className="build-category">
          <span className="category-title">🚶‍♂️ MOVE</span>
          <div className="category-bar">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="bar"></div>
            ))}
          </div>
        </div>
        <div className="build-category">
          <span className="category-title">🧘 FOCUS</span>
          <div className="category-bar">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="bar"></div>
            ))}
          </div>
        </div>
        <div className="build-category">
          <span className="category-title">🍴 NOURISH</span>
          <div className="category-bar">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="bar"></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BCXDayScreen;
