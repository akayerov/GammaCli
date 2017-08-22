import store from '../store';
import FileSaver from 'file-saver';
const XlsxPopulate = require('xlsx-populate');

// method: 'get'
// 'Content-Type': 'application/json'
const  exportExcel = () => {
  console.log('Export to Excel4');
  // Load a new blank workbook
  XlsxPopulate.fromBlankAsync()
      .then(workbook => {
          // Modify the workbook.
        workbook.sheet('Sheet1').cell('A1').value(1);
        workbook.sheet('Sheet1').cell('B1').value(2);
        workbook.sheet('Sheet1').cell('C1').value(3);
        workbook.sheet('Sheet1').cell('A2').value(11);
        workbook.sheet('Sheet1').cell('B2').value(12);
        workbook.sheet('Sheet1').cell('C2').value(13);
        workbook.sheet('Sheet1').cell('A3').value(21);
        workbook.sheet('Sheet1').cell('B3').value(22);
        workbook.sheet('Sheet1').cell('C3').value(23);
        const r = workbook.sheet(0).range('A1:C3');

        r.style('bold', true);
        r.style({
          bold: true,
          border: true
        });
          // Write to file.
        workbook.outputAsync()
        .then((blob) => {
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, 'out.xlsx');
          } else {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');

            document.body.appendChild(a);
            a.href = url;
            a.download = 'out.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          }
        })
        .catch((err) => {
          alert(err.message || err);
          throw err;
        });
      });
};

export default exportExcel;


// Из файла с примера пакета xlsx-populate для броузера
    // Promise is not defined in IE so xlsx-populate uses a polyfill via JSZip.
/*
const Promise = XlsxPopulate.Promise;

const radioBlank = document.getElementById('radio-blank');
const radioAjax = document.getElementById('radio-ajax');
const radioLocal = document.getElementById('radio-local');
const urlInput = document.getElementById('url-input');
const fileInput = document.getElementById('file-input');

function getWorkbook() {
  if (radioBlank.checked) {
    return XlsxPopulate.fromBlankAsync();
  } else if (radioAjax.checked) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      const url = urlInput.value;

      req.open('GET', url, true);
      req.responseType = 'arraybuffer';
      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          if (req.status === 200) {
            resolve(XlsxPopulate.fromDataAsync(req.response));
          } else {
            reject(`Received a ${  req.status  } HTTP code.`);
          }
        }
      };

      req.send();
    });
  } else if (radioLocal.checked) {
    const file = fileInput.files[0];

    if (!file) return Promise.reject('You must select a file.');
    return XlsxPopulate.fromDataAsync(file);
  }
}

function generate(type) {
  return getWorkbook()
            .then((workbook) => {
              workbook.sheet(0).cell('A1').value('This was created in the browser!').style('fontColor', 'ff0000');
              return workbook.outputAsync(type);
            });
}

function generateBlob() {
  return generate()
            .then((blob) => {
              if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, 'out.xlsx');
              } else {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');

                document.body.appendChild(a);
                a.href = url;
                a.download = 'out.xlsx';
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
              }
            })
            .catch((err) => {
              alert(err.message || err);
              throw err;
            });
}

function generateBase64() {
  return generate('base64')
            .then((base64) => {
              if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                throw new Error('Navigating to data URI is not supported in IE.');
              } else {
                location.href = `data:${  XlsxPopulate.MIME_TYPE  };base64,${  base64}`;
              }
            })
            .catch((err) => {
              alert(err.message || err);
              throw err;
            });
}
*/
