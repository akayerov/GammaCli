import { GET_PRIVATE_RES } from './';

const privateReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRIVATE_RES:
      return action.payload;
    default:
      return state;
  }
};

export default privateReducer;
