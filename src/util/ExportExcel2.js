import store from '../store';
import FileSaver from 'file-saver';

// method: 'get'
// 'Content-Type': 'application/json'
const  exportExcel = () => {
  console.log('Export to Excel');
  fetch('//localhost:3000/export2', {
    headers: {
      Authorization: store.getState().auth.token
    }
  })
  .then((response) => {
    console.log('Response');
    return response.blob();
  }).then((blob) => {
    console.log('Save filter');
    FileSaver.saveAs(blob, 'Test1.xlsx');
  });
};

export default exportExcel;
