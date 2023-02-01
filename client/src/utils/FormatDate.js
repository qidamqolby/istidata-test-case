export default function FormatDate(date) {
  let format = new Date(date);
  let year = format.getFullYear();
  let month = format.getMonth() + 1;
  let day = format.getDate();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return `${year}-${month}-${day}`;
}
