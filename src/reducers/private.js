import { GET_PRIVATE_RES } from '../actions/private-actions';

const privateReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRIVATE_RES:
      return action.payload;
    default:
      return state;
  }
}

export default privateReducer;