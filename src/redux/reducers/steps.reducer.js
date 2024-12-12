const initialState = {
    steps:[],
};

const stepsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_STEPS":
        return {
          ...state,
          steps:action.payload,
        };
      default:
        return state;
    }
  };

  export default stepsReducer;
  