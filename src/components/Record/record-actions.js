export const GET_RECORD = 'GET_RECORD';
const conf = require('../../conf');

import { SET_SELECT_FIELD, setFormField  } from '../FormRecord/FormSelect-actions';
import {  initialState  } from '../FormRecord/FormSelect-reducer';
/*
export const getRecordsData = () => (dispatch, getState) => {
*/

// akk это полный аналог переписанный в другой нотации
export function getRecord(id) {
  return function (dispatch, getState) {
    if (id !== 'add') {
//      fetch(`//localhost:3000/record/${id}`, {
      fetch(`${conf.url  }/record/${id}`, {

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
         console.log('getRecord:', json.patient.lname);
         console.log('date_fact:', json.date_fact);
  // заполнение store полей ввода значениями из базы данных
         let dateFact = '';

         if (json.date_fact !== null && json.date_fact !== '1899-12-31T21:00:00.000Z') {
           dateFact = json.date_fact;
         }
         dispatch({ type:SET_SELECT_FIELD,
           data: {  patient: { key : json.patient.id, label: json.patient.lname },
             moId:      { value: json.moId, changed: false },
             state:     { value: json.state, changed: false },
             date_rec:  { value: json.date_rec, changed: false },
             date_fact: { value: dateFact, changed: false },
             date_end:  { value: json.date_end, changed: false },
             patObj:    { value: json.patient, changed: false } }
         });
         dispatch({ type:GET_RECORD, data: json.result || json });
       })
       .catch(err => alert(err.message || err));
    }     else { // add record
      const objField = initialState;

      dispatch({ type:SET_SELECT_FIELD, data: objField
      });
    }
  };
}
