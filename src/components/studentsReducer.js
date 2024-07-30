const initialState = {
    data: [],
    error: null,
  };
  
  const studentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_STUDENTS_DATA':
        return {
          ...state,
          data: action.payload,
        };
      case 'SET_STUDENTS_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default studentsReducer;
  