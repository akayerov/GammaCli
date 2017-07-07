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
         let dateFact = '';

         if (json.date_fact !== null && json.date_fact !== '1899-12-31T21:00:00.000Z') {
           dateFact = json.date_fact;
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
