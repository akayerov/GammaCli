import { notification } from 'antd';
export const GET_LOGIN_RESPONSE = 'GET_LOGIN_RESPONSE';
export const LOGOUT = 'LOGOUT';

export const handleLogin = (payload) => {
  window.localStorage.setItem('token', payload.token);
  window.localStorage.setItem('displayname', payload.user.displayname);
  notification.success({ message: `Hi, ${payload.user.displayname} (${payload.user.username})` });
  return ({ type: GET_LOGIN_RESPONSE, payload });
};
export const logout = () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('displayname');
  notification.info({ message: 'Bye bye!' });
  return ({ type: LOGOUT });
};
