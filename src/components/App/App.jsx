import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import PhotoUpload from '../PhotoUpload/PhotoUpload';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import './App.css';
import ChecklistPage from '../ChecklistPage/ChecklistPage';
import ConfirmYourDetailsPage from '../ConfirmYourDetailsPage/ConfirmYourDetailsPage';
//For Navigation Buttons:
import NavigationButtons from '../NavigationButtons/NavigationButtons';
import ButtonToGo from '../ButtonToGo/ButtonToGo';
import PhaseOnePage from '../RegisterForm/RegisterForm';   // placeholder to avoid undefined here

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

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
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/PhotoUpload/:id"
          >
            <PhotoUpload />
          </ProtectedRoute>

          {/* <ProtectedRoute
            // temporary to view
            exact
            path="/src/components/MissedDayView"
          >
            <MissedDayView />
          </ProtectedRoute> */}

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

          <Route
            exact
            path="/registration"
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

          <Route
            // sends user to confirmation of details
            exact
            path="/confirm"
          >
            <ConfirmYourDetailsPage />
          </Route>

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
          {//TODO: add authentication; left out for testing
          }
          <Route
            exact
            path ="/main"
          >
            <ChecklistPage />
          </Route>




          {/* For Navigation Buttons:   */}
          <Route>
            <div>
              <NavigationButtons />
                <Route path="../RegisterPage" element={<RegisterPage />} />
                <Route path="../PhotoUpload" element={<PhotoUpload />} />
            </div>
          </Route>

          {/* Navigate to PhaseOnePage */}
          <Route>
            <div>
              <ButtonToGo />
              <Route path="../PhaseOnePage" element={<PhaseOnePage />} />
            
            </div>
          </Route>


          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>

        </Switch>
        <Footer />
      </div>

    </Router>
  );
}
export default App;
