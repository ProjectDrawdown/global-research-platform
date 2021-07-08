import store from "../redux/store";
import { setVariableValue, getValues } from "../services/workbook";
import { doUpdateWorkbookVariationVariableThunk, fetchWorkbookThunk } from "../redux/reducers/workbook/workbookSlice";

export const revealInputKeyDownEventFactory = (setInputState, onBlur, values) => (event, path) => {
  switch (event.keyCode) {
    case 13:
      onBlur(event, path);
      break;
    case 27:
      event.target.value = values[path];
      setInputState(false);
      break;
  }
}

export const revealInputBlurEventFactory = (setInputState, technologyId, workbook, values, region = false, parseValueFn = x => parseFloat(x)) => async (
  { target },
  path
) => {
  if (workbook?.id) {
    const oldValue = values[path];
    const parsedWidgetValue = parseValueFn(target.value);
    const newValue = region
      ? Object.assign({}, oldValue, {
          [region]: parsedWidgetValue
        })
      : parsedWidgetValue;

    const unchanged =
      region
        ? ( oldValue[region] === newValue[region] )
        : ( oldValue === newValue );

    if (!unchanged) {
      values[path] = region ?
        ( newValue[region].value || newValue[region] ) :
        ( newValue.value || newValue );
      setInputState(false);
      await store.dispatch(
        doUpdateWorkbookVariationVariableThunk({
          workbookId: workbook.id,
          variationIndex: 0,
          technology: technologyId,
          varpathFull: path,
          target: "scenario",
          oldValue,
          newValue
        })
      );
    } else {
      setInputState(false);
    }
  } else {
    target.value = values[path];
    setInputState(false);
  }
};

export const revealInputClickEventFactory = setInputState => path => setInputState(path);
