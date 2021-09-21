import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink
} from "@fortawesome/free-solid-svg-icons";
import {
  Heading,
  Button
} from "@chakra-ui/react"
import DataTable from 'react-data-table-component'


// TODO: data to be loaded from state and injected into component
const columns = [
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Year',
        selector: row => row.year,
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
]

export default function render() {
  return (
    <>
      <Heading>Title</Heading>
      <Button 
        leftIcon={<FontAwesomeIcon icon={faLink} />}
        color={`brand.electricity.900`}
        variant="outline"
        mr="2">
        Download Dataset
      </Button>
      <DataTable
        columns={columns}
        data={data}
      />
    </>
  )
}