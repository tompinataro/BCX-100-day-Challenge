const initialState = {
    dailyHabits: {
      daily_hydrate: false,
      daily_grow: false,
      daily_move: false,
      daily_focus: false,
      daily_nourish: false,
      daily_dinner: false,
    },
  };
  
  const userProgressReducer = (state = { progress: [] }, action) => {
    switch (action.type) {
      case 'SET_USER_PROGRESS':
        return { ...state, progress: action.payload };
      default:
        return state;
    }
  };
  
  
  export default userProgressReducer;
  