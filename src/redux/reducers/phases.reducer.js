// actions.js
export const fetchPhases = () => ({ type: 'FETCH_PHASES' });

// reducers/phasesReducer.js
const initialState = {
  phases: [],
};

const phasesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PHASES':
      return { ...state, phases: action.payload };
    default:
      return state;
  }
};

export default phasesReducer;
