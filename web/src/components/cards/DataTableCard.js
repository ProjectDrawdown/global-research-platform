import {
  Heading
} from "@chakra-ui/react"
import DataTable from 'react-data-table-component'

import {
  useObjectPathSelector,
} from "redux/selectors.js";
import { Card, CardBody } from "components/Card"


const generateDataLoop = (row, sourceObj, source, name = "") => {
  if (Array.isArray(sourceObj[source])) {
    sourceObj[source].forEach((obj) => {
      const item = {
        [name + source]: typeof obj['value'] == "number" ? obj['value'].toFixed(2) : obj['value']
      }

      const index = row.findIndex(el => el.year === obj['year'])
      if (index > -1) {
        Object.assign(row[index], item)
      } else {
        item['year'] = obj['year']
        row.push(item)
      }
    })
  } else if (sourceObj[source] && typeof sourceObj[source] === 'object') {
    const objKeys = Object.keys(sourceObj[source])
    objKeys.forEach(objKey => {
      generateDataLoop(row, sourceObj[source], objKey, `${source} `)
    })
  }
}

const generateColumnLoop = (column, sourceObj, source, name = "") => {
  if (Array.isArray(sourceObj[source])) {
    column.push({
      name: name + source,
      selector: row => row[name + source]
    })
  } else if (sourceObj[source] && typeof sourceObj[source] === 'object') {
    const objKeys = Object.keys(sourceObj[source])
    objKeys.forEach(objKey => {
      generateColumnLoop(column, sourceObj[source], objKey, `${source} `)
    })
  }
}


const generateData = (sourceObj) => {
  const objKeys = Object.keys(sourceObj)
  const column = [
    {
      name: ' ',
      selector: row => row.year,
    }
  ]
  const row = []

  objKeys.forEach(source => {
    generateColumnLoop(column, sourceObj, source)

    // Checking for array in case wrong format is passed
    generateDataLoop(row, sourceObj, source)
  })

  return {
    column,
    row
  }
}

export default function Render({
  title,
  sourceListObjectpath
}) {
  const sourceObj = useObjectPathSelector(
    sourceListObjectpath,
    {}
  );

  const { column, row } = generateData(sourceObj)

  return (
    <>
      <Heading>{title}</Heading>
      <Card size="max">
        <CardBody>
          <DataTable
            columns={column}
            data={row}
            fixedHeader={true}
          />
        </CardBody>
      </Card>
    </>
  )
}