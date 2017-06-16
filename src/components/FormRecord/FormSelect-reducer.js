import { SET_SELECT_FIELD } from './FormSelect-actions';
import  DateYMD  from '../../util/dateYMD';

export const initialState = {
  patient: {
    key: '0',
    label: 'Not Selected'
  },
  id:0,
  idMo:0,
  state:0,
  date_rec: { value:DateYMD(new Date()), changed: false },
  date_fact: { value:'', changed: false },
  date_end: { value:DateYMD(new Date()), changed: false },
  patObj:{
    value: {
      id: 0,
      fname:'',
      sname:'',
      lname:'',
      date_b:'1970-01-01',
      сity:'',
      street:'',
      house:'',
      kvart:' '
    },
    changed: false
  }
};
const FormSelectReducer = (state = initialState, action) => {
  console.log('FormSelectReducer');
  console.log(action);

  switch (action.type) {
    case SET_SELECT_FIELD:
      if (action.data !== undefined)        {
        return action.data;
      }
    default:
      return state;
  }
};

export default FormSelectReducer;
