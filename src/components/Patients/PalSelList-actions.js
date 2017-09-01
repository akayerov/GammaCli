export const GET_PAT_SELECT_LIST = 'GET_PAT_SELECT_LIST';
const conf = require('../../conf');

// akk это полный аналог переписанный в другой нотации
export function getPatSelList() {
  return function (dispatch, getState) {
    console.log('getPatSelList');
//    fetch('//localhost:3000/patients', {
    fetch(`${conf.url  }/patients`, {
      headers: {
        Authorization: getState().auth.token
      }
    })
     .then(res => res.json())
     .then(json => {
   /*
       if (!json.success) {
         throw new Error('failed!');
       }
   */

       dispatch({ type:GET_PAT_SELECT_LIST, data: json.result || json });
     })
     .catch(err => alert(err.message || err));
  };
}
