export const GET_RECORDS_DATA = 'GET_RECORDS_DATA';
/*
export const getRecordsData = () => (dispatch, getState) => {
  console.log('getRecordsData');
  fetch('//localhost:3000/records', {
    headers: {
      Authorization: getState().auth.token
    }
  })
  .then(res => res.json())
  .then(json => {

//    if (!json.success) {
//      throw new Error('failed!');
//    }

    dispatch({ type:GET_RECORDS_DATA, data: json.result || json });
  })
  .catch(err => alert(err.message || err));
};
*/

// akk это полный аналог переписанный в другой нотации
export function getRecordsData() {
  return function (dispatch, getState) {
    console.log('getRecordsData');
    fetch('//localhost:3000/records', {
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

       dispatch({ type:GET_RECORDS_DATA, data: json.result || json });
     })
     .catch(err => alert(err.message || err));
  };
}
