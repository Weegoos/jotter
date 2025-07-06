export function useDateFormat(dateString) {
  const date = new Date(dateString);

  const options = {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Almaty',
  };

  return date.toLocaleString('ru-RU', options).replace(',', '');
}
