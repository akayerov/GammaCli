import { GET_RECORDS_DATA } from './records-actions';

const recordsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_RECORDS_DATA:
      return action.data;
    default:
      return state;
  }
};

export default recordsReducer;
