export function makeSinkSourceDataObj(
  sectorData,
  sourceSectors,
  sinkSectors,
  sectorKey = "sector"
) {
  const sourceSectorData = sectorData.filter(
    x => sourceSectors.indexOf(x[sectorKey]) > -1
  );
  const sinkSectorData = sectorData.filter(
    x => sinkSectors.indexOf(x[sectorKey]) > -1
  );
  return {
    sources: sourceSectorData,
    sinks: sinkSectorData
  };
}
