const userConfirmReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_TEMP_USER':
        return action.payload;
      case 'UNSET_TEMP_USER':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.userConfirm
  export default userConfirmReducer;