// dd/mm/yyyy
export function getFormattedDate(date) {
  return new Date(date).toLocaleDateString("es-BO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
export function getFormattedHour(time) {
  if (time.length === 8) return time.substring(0, 5);
  return time;
}
export function padNumber(number, i, symbol) {
  if (number) {
    return number.toString().padStart(i, symbol);
  } else {
    let n = 0;
    return n.toString().padStart(i, symbol);
  }
}
