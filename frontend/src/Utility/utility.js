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
