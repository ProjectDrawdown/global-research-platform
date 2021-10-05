import {
  Heading
} from "@chakra-ui/react"
import DataTable from 'react-data-table-component'

import {
  useObjectPathSelector,
} from "redux/selectors.js";
import { Card, CardBody } from "components/Card"


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
    column.push({
      name: source,
      selector: row => row[source]
    })

    sourceObj[source].forEach((obj) => {
      const item = {
        [source]: obj['value']
      }

      const index = row.findIndex(el => el.year === obj['year'])
      if (index > -1) {
        Object.assign(row[index], item)
      } else {
        item['year'] = obj['year']
        row.push(item)
      }
    })
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
          />
        </CardBody>
      </Card>
    </>
  )
}