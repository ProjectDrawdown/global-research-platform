export function sourcesObjectToOptionsArray(sourcesObj, initial = [], categoryRegex = /^Region/) {
  return Object.entries(sourcesObj).reduce(
    (acc, [category, sources]) => {
      if (category.match(categoryRegex)) return acc;
      return acc.concat([category], Object.keys(sources));
    },
    initial
  );
}

export function formatDisplayNumber(number) {
  return ( Math.round(( number || 0 ) * 100) / 100 ).toString();
}
