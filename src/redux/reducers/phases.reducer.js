const initialState = {
    phases:[],
};

const phasesReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_PHASES":
        return {
          ...state,
          phases:action.payload
        };
      default:
        return state;
    }
  };

  export default phasesReducer;
  