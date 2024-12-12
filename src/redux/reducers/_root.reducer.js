import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import userProgressReducer from './userProgress.reducer';
import userConfirmReducer from './userConfirm.reducer';
import phasesReducer from './phases.reducer';
import stepsReducer from './steps.reducer';
import dailyHabitsReducer from './dailyHabits.reducer'; // Import new reducer

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user,   // will have an id and username if someone is logged in
  userProgressReducer,
  userConfirmReducer,
  phasesReducer,
  dailyHabitsReducer, // Add daily habits reducer,
  stepsReducer,

});

export default rootReducer;
