export function camelCaseToNormal(str) {
  let result = str.replace(/([A-Z])/g, ' $1');
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return result;
}

export function kebabCaseToNormal(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function addToSessionStorage(key, value) {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error adding to sessionStorage:', error);
  }
}

export function getFromSessionStorage(key) {
  try {
    const serializedValue = sessionStorage.getItem(key);
    return serializedValue ? serializedValue : null;
  } catch (error) {
    console.error('Error getting from sessionStorage:', error);
  }
}

export function toUpperCase(str) {
  if (typeof str !== 'string') {
    return '';
  }
  return str.toUpperCase();
}
export function getInitials(name) {

  if (!name) return '';
  const words = name.trim().split(' ');
  const initials = words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

  return initials;
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' }); // Get short month name
  const hours = String(date.getHours()).padStart(2, '0'); // Get hours in 24-hour format
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad with zero if needed

  // Add suffix to day (st, nd, rd, th)
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
      ? 'rd'
      : 'th';

  return `${day}${suffix} ${month} ${hours}:${minutes}`;
}