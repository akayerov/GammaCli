import store from '../store';


const  exportExcel = () => {
  console.log('Export to Excel');
  fetch('//localhost:3000/export', {
    headers: {
      Authorization: store.getState().auth.token
    }
  })
 .then()
 .catch(err => alert(err.message || err));
};

export default exportExcel;
