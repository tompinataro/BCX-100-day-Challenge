const initialState = {
    progress:[],
};

const userProgressReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_USER_PROGRESS":
        return {
          ...state,
          progress:action.payload
        };
      default:
        return state;
    }
  };

  export default userProgressReducer;
  