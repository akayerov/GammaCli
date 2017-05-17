import { GET_LOGIN_RESPONSE, LOGOUT } from '../actions/auth-actions';

const initialState = window.localStorage.getItem('token');

const auth = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGIN_RESPONSE:
      return action.payload.token;
    case LOGOUT:
      return null;
    default:
      return state;
  }
};

export default auth;
