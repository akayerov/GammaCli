import { GET_RECORD } from './record-actions';

const recordReducer = (state = [], action) => {
  switch (action.type) {
    case GET_RECORD:
      return action.data;
    default:
      return state;
  }
};

export default recordReducer;
