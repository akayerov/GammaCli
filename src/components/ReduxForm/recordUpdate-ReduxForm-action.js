export const UPDATE_RECORD = 'UPDATE_RECORD';
import  DateYMD  from '../../util/dateYMD';

function encodeBodyRF(getState, flagAdd, value) {
  const id    = value.id  || 0;
  const idPat = encodeURIComponent(value.patient.id  || 0);
  const lname = encodeURIComponent(value.patient.lname || '');
  const fname = encodeURIComponent(value.patient.fname || '');
  const sname = encodeURIComponent(value.patient.sname || '');
  const city = encodeURIComponent(value.patient.city || '');
  const street = encodeURIComponent(value.patient.street || '');
  const house = encodeURIComponent(value.patient.house || '');
  const kvart = encodeURIComponent(value.patient.kvart || '');
  const contact = encodeURIComponent(value.patient.contact || '');

  console.log('encodeBodyRF:Value:', value);
  let state = 0,
    moId = 0,
    patientId = 0;

  if (flagAdd == true) {
    moId = encodeURIComponent(getState().auth.moId);
    patientId = 0;
    state = 0;
  }  else {
    moId = encodeURIComponent(getState().auth.moId);
    patientId = encodeURIComponent(value.patient.id);
    state = encodeURIComponent(value.state);
  }
//  console.log('state:', state);
  let sParam = '';

  sParam += `idPat=${idPat}&lname=${lname}&fname=${fname}&sname=${sname}&`;
  sParam += `city=${city}&street=${street}&house=${house}&kvart=${kvart}&contact=${contact}&`;

  // незаполненные поля даты
  const dateRec = encodeURIComponent(DateYMD(value.date_rec || null));

  if (dateRec !== '')    {
    sParam += `date_rec=${dateRec}&`;
  }
  const dateEnd = encodeURIComponent(DateYMD(value.date_end || null));

// 1900-01-01 решает проблему, когда ранее внесенную дату позднее надо удалить -
// передавать null не получается, sequalize не пропускает
  console.log('TEST value.date_end:', value.date_end, dateEnd);
  if (dateEnd !== '')    {
    sParam += `date_end=${dateEnd}&`;
  }
  const dateB = encodeURIComponent(DateYMD(value.patient.date_b || null));

  if (dateB !== '')    {
    sParam += `date_b=${dateB}&`;
  }
  // если фактическая дата присуствует - состояние автоматически становится 1
  const dateFact = encodeURIComponent(DateYMD(value.date_fact || null));

  if (dateFact !== '')    {
    state = 1;
    sParam += `date_fact=${dateFact}&`;
    console.log('state:', state);
  } else {
    state = 0;
  }

  sParam += `state=${state}&moId=${moId}&patientId=${patientId}`;
  console.log('sParam:', sParam);

  return { count:1, id, value: sParam };
}
// akk это полный аналог переписанный в другой нотации
// body: 'date_rec="2017-05-30"'
export function updateRecordRF(flagAdd, value) {
  return function (dispatch, getState) {
    let oBody = { count:0, value: '' };

    oBody = encodeBodyRF(getState, flagAdd, value);
    console.log(oBody);
    if (oBody.count > 0) {
      let sMetod = 'PUT';

      if (flagAdd !== false) {
        sMetod = 'POST';
        console.log('AddRecords: POST');
      }


//      fetch(`//localhost:3000/recordf/${getState().record.id}`, {
      fetch(`//localhost:3000/recordf/${oBody.id}`, {
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
