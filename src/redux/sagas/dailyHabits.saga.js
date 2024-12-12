import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUserProgress(action) {
    const userId = action.payload; // Pass user ID as payload
    try {
      const response = yield axios.get(`/api/userProgress/${userId}`); // Update endpoint
      yield put({ type: 'SET_USER_PROGRESS', payload: response.data });
    } catch (error) {
      console.error('Failed to fetch user progress:', error);
    }
  }
  
function* updateHabit(action) {
  try {
    yield axios.put('/api/dailyHabits', action.payload);
  } catch (error) {
    console.error('Failed to update habit:', error);
  }
}

function* dailyHabitsSaga() {
  yield takeLatest('FETCH_DAILY_HABITS', fetchUserProgress);
  yield takeLatest('UPDATE_HABIT', updateHabit);
}

export default dailyHabitsSaga;
