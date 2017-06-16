export const SET_SELECT_FIELD = 'SET_SELECT_FIELD';
/* всталяю изменения в state store */
export function setFormField(sObj, valObj) {
//  console.log('!!!! setFormField !!!!');
  return function (dispatch, getState) {
    const state = {};

    Object.assign(state,  getState().selectForm);
    state[sObj].value = valObj;
    state[sObj].changed = true;
//    console.log('Oldstate:', state);
    dispatch({ type:SET_SELECT_FIELD, data: state  });
  };
}
