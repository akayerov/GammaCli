export const GET_RECORD = 'GET_RECORD';
/*
export const getRecordsData = () => (dispatch, getState) => {
*/

// akk это полный аналог переписанный в другой нотации
export function getRecord(id) {
  return function (dispatch, getState) {
    if (id !== 'add') {
      fetch(`//localhost:3000/record/${id}`, {
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
         console.log('getRecordReduxForm:', json.patient.lname);
         console.log('date_factReduxForm:', json.date_fact);
  // заполнение store полей ввода значениями из базы данных
         if (json.date_fact === '1900-01-01T00:00:00.000Z') {
           json.date_fact =  null;
         }
         if (json.date_rec === '1900-01-01T00:00:00.000Z') {
           json.date_rec = null;
         }
         if (json.date_end === '1900-01-01T00:00:00.000Z') {
           json.date_end = null;
         }
         if (json.patient.date_b === '1900-01-01T00:00:00.000Z') {
           json.date_end = null;
         }


         dispatch({ type:GET_RECORD, data: json.result || json });
       })
       .catch(err => alert(err.message || err));
    }     else { // add record
      dispatch({ type:GET_RECORD,
        data: {
          date_rec:'2017-06-01T21:00:00.000Z'
        }
      });
    }
  };
}
