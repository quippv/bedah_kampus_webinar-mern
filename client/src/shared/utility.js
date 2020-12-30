import validator from "validator";

export const updateObject = (object, update) => ({ ...object, ...update });

export const validation = (type, value) => {
  switch (type) {
    case "email":
      return validator.isEmail(value);
    case "password":
      return validator.isLength(value, { min: 8 });
    case "name":
      return value === "" ? false : true;
    default:
      return false;
  }
};

export const formatRupiah = (angka, prefix) => {
  let number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
};

export const dateGoToMonth = (month) => {
  if (month === 1) {
    return "Jan";
  } else if (month === 2) {
    return "Feb";
  } else if (month === 3) {
    return "Mar";
  } else if (month === 4) {
    return "Apr";
  } else if (month === 5) {
    return "Mei";
  } else if (month === 6) {
    return "Jun";
  } else if (month === 7) {
    return "Jul";
  } else if (month === 8) {
    return "Aug";
  } else if (month === 9) {
    return "Sep";
  } else if (month === 10) {
    return "Oct";
  } else if (month === 11) {
    return "Nov";
  } else if (month === 12) {
    return "Dec";
  } else {
    return "Jan";
  }
};

export const dateGoToDay = (day) => {
  if (day === 0) {
    return "Sunday";
  } else if (day === 1) {
    return "Monday";
  } else if (day === 2) {
    return "Tuesday";
  } else if (day === 3) {
    return "Wednesday";
  } else if (day === 4) {
    return "Thursday";
  } else if (day === 5) {
    return "Friday";
  } else if (day === 6) {
    return "Saturday";
  } else {
    return "Sunday";
  }
};

export const dateFormat = (date) => {
  return date < 10 ? "0" + date : date;
};
