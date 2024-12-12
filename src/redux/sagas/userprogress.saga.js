import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUserProgress(action) {
    const id = action.payload;
    console.log("Validating user id at the Saga", id);
    try{
        const userProgressResponse = yield axios.get(`/api/userProgress/${id}`);
        console.log('user progress response:', userProgressResponse.data);
        yield put({type: 'SET_USER_PROGRESS', payload:userProgressResponse.data})
    }
    
    catch (error){
        console.log('user progress saga get request error', error)
    }
}




function* userProgressSaga(){
    yield takeLatest('FETCH_USER_PROGRESS', fetchUserProgress)
  
    
}


export default userProgressSaga;