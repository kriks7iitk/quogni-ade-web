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
  console.log('name is');
  console.log(name);

  if (!name) return '';
  const words = name.trim().split(' ');
  const initials = words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

  return initials;
}