import { useSelector } from "react-redux";
import { objectHasAll } from "util/component-utilities";
import objectPath from "object-path";

export function useObjectPathSelector(path, defaultValue) {
  return useSelector(state => objectPath.get(state, path) || defaultValue);
}

export function useObjectPathsSelector(paths) {
  return useSelector(state => {
    paths.map(path => objectPath.get(state, path));
  });
}

export function useArrayVarpathSelector(
  varpath,
  target = "scenario",
  variationIndex = 0
) {
  const workbookPath = ["workbook", "workbook"];
  const parentVarpath = [...workbookPath, target, "data", ...varpath];
  // TODO we may need to strip last element if it's "value"
  const variationVarpath = [
    ...workbookPath,
    "variations",
    variationIndex,
    `${target}_vars`,
    ...varpath
  ];
  return useSelector(state => {
    let dataEntry = objectPath.get(state, variationVarpath);
    dataEntry =
      typeof dataEntry !== "undefined"
        ? dataEntry
        : objectPath.get(state, parentVarpath);
    return typeof dataEntry === "object" &&
      typeof dataEntry.value !== "undefined "
      ? dataEntry.value
      : dataEntry;
  });
}

export function useStringVarpathSelector(
  varpath,
  target = "scenario",
  variationIndex = 0
) {
  const workbookPath = "workbook.workbook";
  const targetVarpath = `${target}_vars.${varpath}`;
  const parentVarpath = `${workbookPath}.${target}.data.${varpath.replace(/.value$/,"")}`;
  const variationVarpath = `${workbookPath}.variations.${variationIndex}.${target}_vars.${varpath.replace(/\.value$/, "")}`;
  return useSelector(state => {
    let dataEntry = objectPath.get(state, variationVarpath);
    dataEntry =
      typeof dataEntry !== "undefined" && dataEntry !== null
        ? dataEntry
        : objectPath.get(state, parentVarpath);
    return typeof dataEntry === "object" &&
      typeof dataEntry.value !== "undefined"
      ? dataEntry.value
      : dataEntry;
  });
}

export function useMultipleStringVarpathsSelector(
  varpathsArray,
  target = "scenario",
  variationIndex = 0
) {
  const workbookPath = "workbook.workbook";
  const fullVarpathObjs = varpathsArray.map((varpath) => {
    return {
      varpath,
      targetVarpath: `${target}_vars.${varpath}`,
      parentVarpath: `${workbookPath}.${target}.data.${varpath.replace(/.value$/,"")}`,
      variationVarpath: `${workbookPath}.variations.${variationIndex}.${target}_vars.${varpath.replace(/\.value$/, "")}`
    };
  })
  return useSelector(state => {
    return fullVarpathObjs.reduce((acc, {varpath, variationVarpath, parentVarpath}) => {
      let dataEntry = objectPath.get(state, variationVarpath);
      dataEntry =
        typeof dataEntry !== "undefined" && dataEntry !== null
          ? dataEntry
          : objectPath.get(state, parentVarpath);
      acc[varpath] = typeof dataEntry === "object" &&
        typeof dataEntry.value !== "undefined"
        ? dataEntry.value
        : dataEntry;
      return acc;
    }, {})
  });
}

export function useWorkbookIDSelector() {
  return useSelector(
    state => objectPath.get(state, "workbook.workbook.id")
  );
}

export function useWorkbookAuthorSelector() {
  return useSelector(
    state => objectPath.get(state, "workbook.workbook.author")
  );
}

export function useWorkbookHasAuthorSelector() {
  return useSelector(
    state => objectPath.has(state, "workbook.workbook.author.id")
  );
}

export function useWorkbookIsLoadedSelector() {
  return useSelector(
    state =>
      state.workbook !== undefined &&
      state.workbook.workbook !== undefined &&
      state.workbook.status !== "loading"
  );
}

export function useWorkbookIsFullyLoadedSelector() {
  return useSelector(state => {
    return objectHasAll(state.workbook, [
      "workbook",
      "techData",
      "summaryData"
    ]);
  });
}
