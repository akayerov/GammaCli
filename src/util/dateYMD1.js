
const  DateYMD1 = (text) => {
  if (text === null) return '';
  console.log('DateYMD1:', text);
  const y = text.substr(6, 4);
  const m = text.substr(3, 2);
  const d = text.substr(0, 2);

  return `${y}-${  m }-${ d  }`;
};

export default DateYMD1;
