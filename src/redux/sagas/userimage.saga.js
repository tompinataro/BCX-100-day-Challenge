import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* userImage(action){
    try {
        yield axios.post('/api/userImage', action.payload)
        yield put({type: 'FETCH_INITIAL_IMAGE'})
    } catch (error) {
        console.error('Error with Initial Image', error)
    }
}

function* userImageSaga(){
    yield takeLatest('SET_INITIAL_IMAGE', userImage)
  
}

export default userImageSaga;