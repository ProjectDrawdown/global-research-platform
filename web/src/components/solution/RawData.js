import { Fragment } from 'react'

import {
  Box,
  Text,
  Table,
  Tbody,
  Tr,
  Td
} from "@chakra-ui/react"

const tableNames = ["fc", "oc", "pds_adoption_data_per_region", "pds_tam_per_region", "pds_total_adoption_units", "ref_tam_per_region", "ref_total_adoption_units", "soln_marginal_operating_cost_savings", "soln_pds_funits_adopted", "soln_ref_funits_adopted"]


function renderTables (props) {
  return tableNames.map((name, idx) => {
    return (
      <Fragment key={name}>
        <Text fontSize="3xl">{name}</Text>
        {renderData(props.technology.data[name], null, idx, name)}
      </Fragment>
    )
  })
}

export const RawDataHeader = () => (
  <span>Show Raw Data</span>
);

const RawDataForm = props => {
  return (
    <Box>
      {renderTables(props)}
    </Box>
  )
}

function renderData(data, type, idx, name) {
  if (!data) return ""

  else if (Array.isArray(data)) {
    if (name == 'soln_marginal_operating_cost_savings') {
      // this one is weird for some reason
      return(
        <Table size="sm" variant="striped" width="inherit">
          <Tbody>
            <Tr>
              { data.map((obj, idx2) => {return renderData(obj, "key", idx + '-' + idx2, name)}) }
            </Tr>
            <Tr>
              { data.map((obj, idx2) => {return renderData(obj, "value", idx + '-' + idx2, name)}) }
            </Tr>
          </Tbody>
        </Table>
      )
    } else {
      return data.map((x, idx2) => renderData(x, type, idx + '-' + idx2, name))
    }
  }

  else if (typeof data === "object") {
    if (data.year) {
      if (type === "key") {
        return (
            <Td key={idx}><b>{data.year}</b></Td>
        )
      } else if (type === "value") {
        return (
            <Td key={idx}>{parseFloat(data.value, 10).toFixed(2)}</Td>
        )
      }
    } else {
      const keys = Object.keys(data)
      const rows = keys.map((key, idx2) => {
        if (key === "FaIR_CFT_RCP45") return ""

        if (!Array.isArray(data[key])) {
          return (
            <Fragment key={key}>
              <Text fontSize="xl">{key}</Text>
              { renderData(data[key], null, idx + '-' + idx2, name) }
            </Fragment>
          )
        } else {
          return (
            <Fragment key={key}>
              <Text fontSize="xl">{key}</Text>
              <Table size="sm" variant="striped" width="inherit">
                <Tbody>
                  <Tr>
                    { renderData(data[key], "key", idx + '-' + idx2, name) }
                  </Tr>
                  <Tr>
                    { renderData(data[key], "value", idx + '-' + idx2, name) }
                  </Tr>
                </Tbody>
              </Table>
            </Fragment>
          )
        }
      })
      return rows
    }
  }
}

export default RawDataForm;

