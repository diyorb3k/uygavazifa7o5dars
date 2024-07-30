const initialState = {
    data: [],
    error: null,
  };
  
  const teachersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TEACHERS_DATA':
        return {
          ...state,
          data: action.payload,
        };
      case 'SET_TEACHERS_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default teachersReducer;
  