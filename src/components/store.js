import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import adminReducer from './reducers/adminReducer';
import studentsReducer from './reducers/studentsReducer';
import teachersReducer from './reducers/teachersReducer';

const rootReducer = combineReducers({
  admin: adminReducer,
  students: studentsReducer,
  teachers: teachersReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
