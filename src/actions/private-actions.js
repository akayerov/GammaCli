export const GET_PRIVATE_RES = 'GET_PRIVATE_RES';

export const getPrivateData = () => (dispatch, getState) => {
  fetch('//localhost:3000/private', {
    headers: {
      Authorization: getState().token
    }
  })
  .then(res => res.json())
  .then(json => {
    if (!json.success) {
      throw new Error('failed');
    }
    dispatch({ type: GET_PRIVATE_RES, payload: json.result || json });
  })
  .catch(err => alert(err.message || err));
};
