import axios from 'axios';

export const fetchAdminData = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3000/admin');
    dispatch({ type: 'SET_ADMIN_DATA', payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'SET_ADMIN_ERROR', payload: error });
  }
};

export const fetchStudentsData = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3000/students');
    dispatch({ type: 'SET_STUDENTS_DATA', payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'SET_STUDENTS_ERROR', payload: error });
  }
};

export const fetchTeachersData = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3000/teachers');
    dispatch({ type: 'SET_TEACHERS_DATA', payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'SET_TEACHERS_ERROR', payload: error });
  }
};
