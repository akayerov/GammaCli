
const  DateLocale = (text) => {
//  console.log(text);
  if (text === null || text === '1899-12-31T21:00:00.000Z') return '';
  const date = new Date(text);
  const m = date.getMonth() + 1;
  const d = date.getDate();
  let sd = '';

  if (d < 10)    {
    sd = '0';
  }
  sd += d.toString(10);
  let sm = '';

  if (m < 10)    {
    sm = '0';
  }
  sm += m.toString(10);

  return `${ sd  }/${  sm }/${  date.getFullYear()}`;

//  return `${date.getDate()  }/${  date.getMonth() + 1 }/${  date.getFullYear()}`;
};

export default DateLocale;
