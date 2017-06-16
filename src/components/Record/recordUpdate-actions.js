export const UPDATE_RECORD = 'UPDATE_RECORD';
import { SET_SELECT_FIELD, setFormField  } from '../FormRecord/FormSelect-actions';
import { GET_RECORDS_DATA  } from '../Records/records-actions';
import  DateYMD  from '../../util/dateYMD';

function encodeBody(getState, flagAdd) {
  const dateRec = encodeURIComponent(DateYMD(getState().selectForm.date_rec.value));
  const dateEnd = encodeURIComponent(DateYMD(getState().selectForm.date_end.value));
  const idPat = encodeURIComponent(getState().selectForm.patObj.value.id);
  const lname = encodeURIComponent(getState().selectForm.patObj.value.lname);
  const fname = encodeURIComponent(getState().selectForm.patObj.value.fname);
  const sname = encodeURIComponent(getState().selectForm.patObj.value.sname);
  const city = encodeURIComponent(getState().selectForm.patObj.value.city);
  const street = encodeURIComponent(getState().selectForm.patObj.value.street);
  const house = encodeURIComponent(getState().selectForm.patObj.value.house);
  const kvart = encodeURIComponent(getState().selectForm.patObj.value.kvart);
  const dateBD = encodeURIComponent(DateYMD(getState().selectForm.patObj.value.date_b));

  let state = 0,
    moId = 0,
    patientId = 0;

  if (flagAdd == true) {
    moId = encodeURIComponent(getState().auth.moId);
    patientId = 0;
    state = 0;
  }  else {
    moId = encodeURIComponent(getState().selectForm.moId.value);
    patientId = encodeURIComponent(getState().selectForm.patObj.value.id);
    state = encodeURIComponent(getState().selectForm.state.value);

    console.log('update:', getState().selectForm.state.value);
  }
  console.log('state:', state);
  let sParam = `date_rec=${dateRec}&date_end=${dateEnd}&`;

  sParam += `idPat=${idPat}&lname=${lname}&fname=${fname}&sname=${sname}&`;
  sParam += `city=${city}&street=${street}&house=${house}&kvart=${kvart}&`;
  sParam += `date_b=${dateBD}&`;
  sParam += `state=${state}&moId=${moId}&patientId=${patientId}`;

  // незаполненные поля даты
  if (getState().selectForm.date_fact.value != '')    {
    const dateFact = encodeURIComponent(DateYMD(getState().selectForm.date_fact.value));

    sParam += `&date_fact=${dateFact}`;
  }
  return { count:1, value: sParam };
}
// akk это полный аналог переписанный в другой нотации
// body: 'date_rec="2017-05-30"'
export function updateRecord(flagAdd) {
  return function (dispatch, getState) {
    let oBody = { count:0, value: '' };

    oBody = encodeBody(getState, flagAdd);
    console.log(oBody);
    if (oBody.count > 0) {
      let sMetod = 'PUT';

      if (flagAdd !== false) {
        sMetod = 'POST';
      }


      fetch(`//localhost:3000/recordf/${getState().record.id}`, {
        headers: {
          Authorization: getState().auth.token,
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        method:  sMetod,
        body: oBody.value
      })
         .then(res => res.json())
         .then(json => {
       /*
           if (!json.success) {
             throw new Error('failed!');
           }
       */

    //       dispatch({ type:UPDATE_RECORD, data: oRecord });
         })
         .catch(err => alert(err.message || err));
    }
  };
}


function encodeBodyStateNow(mode, getState) {
  let dateFact = encodeURIComponent(DateYMD(new Date()));
  let state = 1;

  if (mode == 1) {
    state = 0;
    dateFact = '1900-01-1';
  }
  const sParam = `date_fact=${dateFact}&state=${state}`;

  return { count:1, value: sParam };
}

// внимание роутер  /record обновлять только одну таблицу! без обновления таблицы пациент
// + getRecord загрузка списка для вывода измененного элемента TABLE (refresh)
// mode = 0 - перевод в состояние 1, установка даты фактичкеского прибытия
// mode = 1 - revert - перевод в состояние 0, reset даты фактичкеского прибытия
// mode = 2 - удадление записи id
export function updateStateRecordNow(mode, id) {
  return function (dispatch, getState) {
    let oBody = { count:0, value: '' };

    if (mode < 2)      {
      oBody = encodeBodyStateNow(mode, getState);
    }
    console.log(oBody);
    if (oBody.count > 0 || mode == 2) {
      let sMetod = 'PUT';

      if (mode == 2)        {
        sMetod = 'DELETE';
      }
      fetch(`//localhost:3000/record/${id}`, {
        headers: {
          Authorization: getState().auth.token,
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        method:  sMetod,
        body: oBody.value
      })
         .then(res => res.json())
         .then(json => {
// refresh
           if (json.success === true) {
             fetch('//localhost:3000/records', {
               headers: {
                 Authorization: getState().auth.token
               }
             })
              .then(res => res.json())
              .then(json => {
                dispatch({ type:GET_RECORDS_DATA, data: json.result || json });
              })
              .catch(err => alert(err.message || err));
           }            else              {
             alert(`Обнаружена ошибка на сервере:${  json.err}`);
           }
         }).catch(err => alert(err.message || err));
    }  // oBody.count > 0 || mode == 2
  };
}
