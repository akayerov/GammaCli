
if (!Date.prototype.toLocaleFormat) {
  Date.prototype.toLocaleFormat = function (format) {
    const f = { y : this.getYear() + 1900, m : this.getMonth() + 1, d : this.getDate(), H : this.getHours(), M : this.getMinutes(), S : this.getSeconds() };
    let k = 0;

    for (k in f)        {
      format = format.replace(`%${  k}`, f[k] < 10 ? `0${  f[k]}` : f[k]);
    }
    return format;
  };
}

const DateToday = () => {
  const d = new Date();
/*
  const d1 = d.toLocaleFormat('%y-%m-%d');
  return d1;
*/

  return d.toLocaleFormat('%y-%m-%d');
};


module.exports = DateToday;
