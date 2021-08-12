export function sourcesObjectToOptionsArray(sourcesObj, initial = []) {
  return Object.entries(sourcesObj).reduce(
    (acc, [category, sources]) => {
      acc.push([category, sources]);
      return acc;
    },
    initial
  );
}

export function formatDisplayNumber(number) {
  return ( Math.round(( number || 0 ) * 100) / 100 ).toString();
}
