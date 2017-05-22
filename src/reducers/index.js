import { combineReducers } from 'redux';

// Reducers
import userReducer from './user-reducer';
import authReducer from './auth';
import privateReducer from './private';
import recordsReducer from '../components/Records/records-reducer';

// Combine Reducers
const reducers = combineReducers({
  userState: userReducer,
  auth:authReducer,
  private: privateReducer,
  records: recordsReducer
});

export default reducers;
