import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doFetchTechnologyVMAMappingsThunk, useTechnologyVMAMappingSelector } from "redux/reducers/vmaMappingsSlice.js";
import { doFetchVMACalculationThunk, varpathFullVMACalculationSelector } from "redux/reducers/vmaCalculationsSlice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInoutAddon } from "../../theme/icons";
import {
  WorkbookContext,
  getVariableValue,
  setVariableValue
} from "../../services/workbook";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Flex,
  Divider,
  Stack,
  Switch,
  Text
} from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { InputWithAddons, Select } from "../Input";

const VMAInput = props => {
  return (
    <InputWithAddons
      {...props}
      size="sm"
      borderRadius="md"
      inputStyle={{
        colorScheme: props.colorScheme,
        borderColor: `${props.colorScheme}.400`,
        focusBorderColor: `${props.colorScheme}.900`
      }}
      addonStyle={{
        backgroundColor: `${props.colorScheme}.300`
      }}
    />
  );
};

const VMAFormItem = ({
  children,
  label,
  varpath,
  technologyId,
  dataType,
  value = "",
  ...inputProps
}) => {
  // const vmaValues = getVMAValues(varValue);

  // TODO: DRY this up, also used in row.js
  //let displayValue = value;
  return (
    <Flex>
      <Flex alignItems="center" justifyContent="flex-end" flex="1" flexGrow="1">
        <Heading as="h5" size="xs" textAlign="right" pr={2}>
          {label}
        </Heading>
      </Flex>
      <Flex>
        {children}
      </Flex>
    </Flex>
  );
};

const VMA = ({
  dataType,
  mean,
  high,
  low,
  sources,
  value,
  source,
  vmaSourceOptions,
  color = 'grey',
  ...inputProps
}) => {
  const leftAddon = dataType === "USD" ? "$" : "";
  const rightAddon = dataType === "percent" ? "%" : "";
  const theme = useTheme();
  return (
    <Flex
      borderWidth="1px"
      direction="horizontal"
      borderColor={`brand.${color}.400`}
      bg={`brand.${color}.100`}
      borderRadius="md"
      w="100%"
      p={2}>
      <Stack
        py={2}
        direction="horizontal"
        borderColor={`brand.${color}.400`}>
        <Stack w="50%">
          <VMAFormItem
            label="Data Source"
            size="sm"
          >
            <Select
              placeholder={false}
              size="sm"
              bg="white"
              borderColor={`brand.${color}.400`}
              focusBorderColor={`brand.${color}.900`}
              borderRadius="md"
              options={vmaSourceOptions}
              value={source}
            />
          </VMAFormItem>
          <VMAFormItem
            label="Use Corrected?"
          >
            <Switch colorScheme={`brand.${color}`} size="md" my={1.5} disabled={true}/>
          </VMAFormItem>
          <VMAFormItem
            label="Use Weighted?"
          >
            <Switch colorScheme={`brand.${color}`} size="md" my={1.5} disabled={true}/>
          </VMAFormItem>
        </Stack>
        <Stack w="50%">
          <VMAFormItem label="Mean">
            <VMAInput leftAddon={leftAddon} rightAddon={rightAddon} value={mean} colorScheme={`brand.${color}`} />
          </VMAFormItem>
          <VMAFormItem label="High">
            <VMAInput leftAddon={leftAddon} rightAddon={rightAddon} value={high} colorScheme={`brand.${color}`} />
          </VMAFormItem>
          <VMAFormItem label="Low">
            <VMAInput leftAddon={leftAddon} rightAddon={rightAddon} value={low} colorScheme={`brand.${color}`} focusBorderColor={`brand.${color}.900`}/>
          </VMAFormItem>
        </Stack>
      </Stack>
    </Flex>
  );
};

const VMAWithState = ({ varpath, varpathFull, target, technologyId, ...props }) => {
  // Base includes
  const dispatch = useDispatch();

  // Get required state: mapping and calcuation for this VMA

  // TODO determine if we need the vmaMapping and more detailed resource detail here
  // const vmaMapping = useTechnologyVMAMappingSelector(technologyId);
  // const resourcePath = vmaMapping.path;
  // const vmaResource = useSelector((state) => vmaResourceSelector(state, resourcePath));

  // FIXME add vma params (useCorrected and useWeighted)
  const useCorrected = false;
  const useWeighted = false;
  // TODO Optimize this so we only get data if we have a mapping for this var
  const vmaCalculationData = useSelector((state) => varpathFullVMACalculationSelector(state, {varpathFull, useCorrected, useWeighted}));

  // Fire fetches for the state we need
  // FIXME: this is not currently needed, but should be once we update the API
  // to use resourceURL instead of varname for calculations.
  // React.useEffect(() => {
  //   if (!vmaMapping) dispatch(doFetchTechnologyVMAMappingsThunk(technologyId));
  // }, [technologyId]);

  // Load the calculation if the mapping, scenario_vars VMA data, or varpath change
  React.useEffect(() => {
    const fetchParams = {
      varpathFull,
      useCorrected,
      useWeighted
    };
    dispatch(doFetchVMACalculationThunk(fetchParams));
  }, [varpathFull]); // TODO add vma params here

  // If we don't have the calculation data yet, set all calcs to null and set loading to true
  if (!vmaCalculationData || vmaCalculationData.length === 0) {
    return <></>;
  }

  const vmaSourceOptions = [vmaCalculationData.source];
  const vmaValues = {
    high: vmaCalculationData.high,
    low: vmaCalculationData.low,
    mean: vmaCalculationData.mean,
    source: vmaCalculationData.source
  };

  return <VMA
           {...props}
           vmaSourceOptions={vmaSourceOptions}
           {...vmaValues}
         />;
};

export default VMAWithState;
