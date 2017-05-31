import { combineReducers } from 'redux';

// Reducers
import authReducer from './auth';
import privateReducer from './private';
import recordsReducer from '../components/Records/records-reducer';
import recordReducer from '../components/Record/record-reducer';
import palselReducer from '../components/Patients/PalSelList-reducer';

// Combine Reducers
const reducers = combineReducers({
  auth:authReducer,
  private: privateReducer,
  records: recordsReducer,
  record: recordReducer,
  palSelList:  palselReducer
});

export default reducers;
