import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import userProgressReducer from './userProgress.reducer';
import userConfirmReducer from './userConfirm.reducer';
import phasesReducer from './phases.reducer';
import stepsReducer from './steps.reducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user,   // will have an id and username if someone is logged in
  userProgressReducer,
  userConfirmReducer,
  phasesReducer,
  stepsReducer,

});

export default rootReducer;
