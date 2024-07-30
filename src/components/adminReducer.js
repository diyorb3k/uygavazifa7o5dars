const initialState = {
    data: [],
    error: null,
  };
  
  const adminReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ADMIN_DATA':
        return {
          ...state,
          data: action.payload,
        };
      case 'SET_ADMIN_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default adminReducer;
  