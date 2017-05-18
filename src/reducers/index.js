import { combineReducers } from 'redux';

// Reducers
import userReducer from './user-reducer';
import authReducer from './auth';
import privateReducer from './private';

// Combine Reducers
const reducers = combineReducers({
  userState: userReducer,
  token: authReducer,
  private: privateReducer
});

export default reducers;
