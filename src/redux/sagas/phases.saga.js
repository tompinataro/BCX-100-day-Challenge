import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPhases() {
  try {
    const response = yield axios.get('/api/phases');
    yield put({ type: 'SET_PHASES', payload: response.data });
  } catch (error) {
    console.error('Failed to fetch phases:', error);
  }
}

function* phasesSaga() {
  yield takeLatest('FETCH_PHASES', fetchPhases);
}

export default phasesSaga;
