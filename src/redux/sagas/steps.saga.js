import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchSteps(action) {
  try {
    const stepId = action.payload;
    console.log('Fetching data for stepId:', stepId);
    const response = yield call(axios.get, `/api/steps/${stepId}`);
    yield put({ type: 'SET_STEPS', payload: response.data });
  } catch (error) {
    console.error('Failed to fetch steps:', error);
    yield put({ type: 'FETCH_STEPS_ERROR', error });
  }
}

function* stepsSaga() {
  yield takeLatest('FETCH_STEPS', fetchSteps); 
}

export default stepsSaga;
