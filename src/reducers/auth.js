import { GET_LOGIN_RESPONSE, LOGOUT } from '../actions/auth-actions';

const initialState = {
  displayname: window.localStorage.getItem('displayname'),
  moId: window.localStorage.getItem('moId'),
  role: window.localStorage.getItem('role'),
  token:  window.localStorage.getItem('token')
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGIN_RESPONSE:
      return { displayname: action.payload.user.displayname, moId: action.payload.user.moId,  role: action.payload.user.role, token: action.payload.token };
    case LOGOUT:
      return { displayname: '' };
    default:
      return state;
  }
};

export default auth;
