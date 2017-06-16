import { GET_PAT_SELECT_LIST } from './PalSelList-actions';

const patSelReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PAT_SELECT_LIST:
      return action.data;
    default:
      return state;
  }
};

export default patSelReducer;
