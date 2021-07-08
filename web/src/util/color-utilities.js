export function hex2rgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? result.slice(1).map(component => parseInt(component, 16))
    : [];
}
