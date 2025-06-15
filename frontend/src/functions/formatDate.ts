export function formatDate(date: string | Date) {
  const timeZone = import.meta.env.VITE_TIMEZONE;

  const formatedDate = new Date(date).toLocaleString('pt-BR', {
    timeZone: timeZone,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return formatedDate;
}
