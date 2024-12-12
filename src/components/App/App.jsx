import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import VideoLauncher from '../VideoLauncher/VideoLauncher';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import ConfirmYourDetailsPage from '../ConfirmYourDetailsPage/ConfirmYourDetailsPage';
import DoNotCheatYourself from '../DoNotCheatYourself/DoNotCheatYourself';
import InstagramView from '../InstagramView/InstagramView';
import MissedDayView from '../MissedDayView/MissedDayView';
import RepeatOrRestart from '../RepeatOrRestart/RepeatOrRestart';
import ShowingIntegrity from '../ShowingIntegrity/ShowingIntegrity';

import UserPage from '../UserPage/UserPage';
import PhotoUpload from '../PhotoUpload/PhotoUpload';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import BCXDayScreen from '../BCXDayScreen/BCXDayScreen';
import EndOfStepView from '../EndOfStepView/EndOfStepView';
import './App.css';
import ChecklistPage from '../ChecklistPage/ChecklistPage';
// import ConfirmYourDetailsPage from '../ConfirmYourDetailsPage/ConfirmYourDetailsPage';
// For Navigation Buttons:
// import NavigationButtons from '../NavigationButtons/NavigationButtons';
// import ButtonToGo from '../ButtonToGo/ButtonToGo';
import PhaseOnePage from '../RegisterForm/RegisterForm';   // Placeholder to avoid undefined here
import StepStarterVideo from '../StepStarterVideo/StepStarterVideo';
import WhatsNext from '../WhatsNext/WhatsNext';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}

          {/* About Page */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/AboutPage"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}

          {/* User Page */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          {/* Photo Upload View */}
          <ProtectedRoute
            exact
            path="/PhotoUpload/:id"
          >
            <PhotoUpload />
          </ProtectedRoute>

          {/* End of Step */}
          <ProtectedRoute
            exact
            path="/EndOfStepView"
          >
            <EndOfStepView />
          </ProtectedRoute>

          {/* What's Next */}
          <ProtectedRoute
            exact
            path="/WhatsNext"
          >
            <WhatsNext />
          </ProtectedRoute>

          {/* Instagram View */}
          <ProtectedRoute
            exact
            path="/InstagramView/:id"
          >
            <InstagramView />
          </ProtectedRoute>

          {/* Step-Starter Video */}
          <ProtectedRoute
            exact
            path="/StepStarterVideo/:id"
          >
            <StepStarterVideo />
          </ProtectedRoute>

          {/* Video Player */}
          <ProtectedRoute
            exact
            path="/VideoPlayer/"
          >
            <VideoPlayer />
          </ProtectedRoute>

          {/* Video Launcher */}
          <ProtectedRoute
            exact
            path="/VideoLauncher/:id"
          >
            <VideoLauncher />
          </ProtectedRoute>

          {/* BCX Day Screen */}
          <Route
            exact
            path="/BCXDayScreen"
          >
            <BCXDayScreen />
          </Route>

          {/* User Log-in */}
          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          {/* Registration */}
          <Route
            exact
            path="/register"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          {/* ConfirmYourDetailsPage */}
          <Route
            // sends user to confirmation of details
            exact
            path="/ConfirmYourDetailsPage"
          >
            <ConfirmYourDetailsPage />
          </Route>

          {/* DoNotCheatYourself */}
          <ProtectedRoute
            exact
            path="/DoNotCheatYourself"
          >
            <DoNotCheatYourself />
          </ProtectedRoute>

          {/* InstagramView */}
          <ProtectedRoute
            exact
            path="/InstagramView"
          >
            <InstagramView />
          </ProtectedRoute>

          {/* MissedDayView */}
          <ProtectedRoute
            exact
            path="/MissedDayView/:id"
          >
            <MissedDayView />
          </ProtectedRoute>

          {/* RepeatOrRestart */}
          <ProtectedRoute
            exact
            path="/RepeatOrRestart"
          >
            <RepeatOrRestart />
          </ProtectedRoute>

          {/* ShowingIntegrity */}
          <ProtectedRoute
            exact
            path="/ShowingIntegrity/:id"
          >
            <ShowingIntegrity />
          </ProtectedRoute>

          {/* Home Page */}
          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* Checklist Page */}
          <Route
            exact
            path="/main"
          >
            <ChecklistPage />
          </Route>

          {/* For Navigation Buttons */}
          <Route>
            <div>
              {/* <NavigationButtons /> */}
              <Route path="../RegisterPage" element={<RegisterPage />} />
              <Route path="../PhotoUpload" element={<PhotoUpload />} />
            </div>
          </Route>

          {/* Navigate to PhaseOnePage */}
          <Route>
            <div>
              {/* <ButtonToGo /> */}
              <Route path="../PhaseOnePage" element={<PhaseOnePage />} />

            </div>
          </Route>


          {/* If none of the other routes matched, we will show a 404. */}
          <Route path='*'>
            <h1>Error: 404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
