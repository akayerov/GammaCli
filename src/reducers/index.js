import { combineReducers } from 'redux';

// Reducers
import userReducer from './user-reducer';
import authReducer from './auth';

// Combine Reducers
const reducers = combineReducers({
  userState: userReducer,
  token: authReducer
});

export default reducers;
