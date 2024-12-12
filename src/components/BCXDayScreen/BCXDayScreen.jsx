import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './BCXDayScreen.css';
import html2canvas from 'html2canvas';
import Confetti from 'react-confetti';
function BCXDayScreen() {
  const dispatch = useDispatch();

  // Select data from Redux state
  const userId = useSelector((state) => state.user.id);
  const userProgress = useSelector((state) => state.userProgressReducer.progress || {});

  const openInstagram = () => {
    const screenshotElement = document.getElementById('screenshotElement');
    html2canvas(screenshotElement).then((canvas)=> {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'bcxGraphic.png';
      link.click();
      setTimeout(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        console.log('is Mobile?', isMobile);
        const instagramUrl = "https://www.instagram.com";
        const instagramAppUrl = "instagram://";
        if(isMobile){
          window.location.href = instagramAppUrl;
          setTimeout(() => {
            window.location.href = instagramUrl;
          }, 500);
        } else {
          window.location.href = instagramUrl;
        }
      }, 300);
    })
    
}

  // Dispatch actions to fetch data when the component loads
  useEffect(() => {
    if (userId) {
      dispatch({ type: 'FETCH_USER_PROGRESS', payload: userId });
      dispatch({ type: 'FETCH_DAILY_HABITS', payload: userId });
    }
  }, [dispatch, userId]);

  if (!userId) {
    return <div>Loading user data...</div>;
  }

  if (!userProgress || Object.keys(userProgress).length === 0) {
    return <div>Failed to load user progress. Please try again later.</div>;
  }

  const tasks = [
    { title: '1 GALLON OF WATER', key: 'water', icon: '💧' },
    { title: '15 MIN. OF PD', key: 'pd', icon: '🧠' },
    { title: '10K STEPS', key: 'steps', icon: '🚶‍♂️' },
    { title: '5 MIN. MEDITATION', key: 'meditation', icon: '🧘' },
    { title: 'FOLLOW A MEAL PLAN', key: 'meal', icon: '🍴' },
    { title: 'UNPLUG & DONE', key: 'unplug', icon: '🔌' },
  ];

  const buildCategories = [
    { title: 'HYDRATE', key: 'hydrate', icon: '💧' },
    { title: 'GROW', key: 'grow', icon: '🧠' },
    { title: 'MOVE', key: 'move', icon: '🚶‍♂️' },
    { title: 'FOCUS', key: 'focus', icon: '🔍' },
    { title: 'NOURISH', key: 'nourish', icon: '🍴' },
  ];

  return (
    <div>
    <div className="bcx-container" id='screenshotElement'>
    {userProgress[0].day == 100 && <Confetti />}
      <header className="bcx-header">
        <h1 className="bcx-title">BCX</h1>
        <h2 className="bcx-day">DAY {userProgress[0].day || 'Loading...'}</h2>
        <div className="bcx-status">{userProgress[0].day == 100 ? 'DONE!' : 'IN PROGRESS'}</div>
      </header>

      <div className="bcx-progress-bar">
        { <div className="progress" style={{ width: `${userProgress[0].day || 0}%` }}></div> }
      </div>

      <section className="bcx-tasks">
        {tasks.map((task, index) => {
          const isCompleted = index + 1 <= userProgress[0].step ? true : false
          const isActive = userProgress.currentTask === task.key;
          return (
            <div
              key={index}
              className={`task-row ${isCompleted && 'completed' }`}
            >
              <span className="task-icon">{task.icon}</span>
              <span className="task-title">{task.title}</span>
            </div>
          );
        })}
      </section>
      
      {/* <section className="bcx-build">
        <h2 className="build-title">BUILD</h2>
        {buildCategories.map((category, index) => (
          <div key={index} className="build-category">
            <div className="build-category-header">
              <span className="category-icon">{category.icon}</span>
              <span>{category.title}</span>
            </div>
            <div className="build-progress">
              {[...Array(10)].map((_, i) => (
                // use i to calc days ... i X 10, up / i X 10 use modulo to get remainder days
                <div
                  key={i}
                  className={`build-box ${
                    i < (userProgress[0]?.day || 0) ? 'filled' : ''
                  }`}
                >{i}</div>
              ))}
            </div>
          </div>
        ))}
      </section> */}


<section className="bcx-build">
  <h2 className="build-Title">BUILD</h2>
  {buildCategories.map((category, index) => (
    <div key={index} className="build-category">
      <div className="build-category-header">
        <span className="category-icon">{category.icon}</span>
        <span>{category.title}</span>
      </div>
      <div className="build-progress">
        {[...Array(10)].map((_, i) => {
          const totalDays = (userProgress[0]?.day || 0); // Total days from user progress
          const categoryStart = index * 10; // Start day for this category
          const categoryEnd = categoryStart + 10; // End day for this category
          
          // Check if the current box falls within the total days
          const isFilled = totalDays > categoryStart && totalDays <= categoryEnd
            ? i < totalDays - categoryStart
            : totalDays > categoryEnd;

          return (
            <div
              key={i}
              className={`build-box ${isFilled ? 'filled' : ''}`}
            >
            </div>
          );
        })}
      </div>
    </div>
  ))}
</section>


    </div>
    <button className='instagramButton' onClick={openInstagram}>Share on Instagram!</button>
    </div>
  );
}

export default BCXDayScreen;
