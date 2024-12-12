import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Trigger 
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/api/user', config);

    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('Confirmation request failed', error);
  }
}

function* userConfirmSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
}

export default userConfirmSaga;
