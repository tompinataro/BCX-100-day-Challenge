import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import userProgressSaga from './userprogress.saga';
import userImageSaga from './userimage.saga';
import userConfirmSaga from './userconfirm.saga';
import phasesSaga from './phases.saga';
import stepsSaga from './steps.saga';
// import dailyHabitsSaga from './dailyHabits.saga'; // Import new saga

export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    userConfirmSaga(),
    userProgressSaga(),
    userImageSaga(),
    phasesSaga(),
    stepsSaga(),
    // dailyHabitsSaga(), // Add daily habits saga
  ]);
}
