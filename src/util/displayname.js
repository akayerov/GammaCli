
const displayName = (data) => {
  if (data.patient !== undefined) {
    return `${data.patient.lname  } ${  data.patient.fname  } ${  data.patient.sname  };${  data.patient.date_b  };${  data.patient.sity}`;
  }
  return '';
};

module.exports = displayName;
