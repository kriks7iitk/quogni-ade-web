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