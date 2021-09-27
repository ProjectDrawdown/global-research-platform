import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink
} from "@fortawesome/free-solid-svg-icons";
import {
  Heading,
  Button
} from "@chakra-ui/react"
import DataTable from 'react-data-table-component'

import {
  useObjectPathSelector,
} from "redux/selectors.js";


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

    for (const [key, value] of Object.entries(sourceObj[source])) {
      const item = {
        [source]: value
      }
      const index = row.findIndex(el => el.year === key)
      
      if (index > -1) {
        Object.assign(row[index], item)
      } else {
        item['year'] = key
        row.push(item)
      }
    }
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
      <DataTable
        columns={column}
        data={row}
      />
    </>
  )
}