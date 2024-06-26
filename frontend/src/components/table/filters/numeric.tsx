/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/no-explicit-any */
// github/ggascoigne/react-table-example?file=/src/Table/filters/numericFilter.tsx
import { FilterValue, IdType, Row } from 'react-table'

const regex = /([=<>!]*)\s*((?:[0-9].?[0-9]*)+)/

const parseValue = (filterValue: FilterValue) => {
  // eslint-disable-next-line eqeqeq
  const defaultComparator = (val: any) => val == filterValue
  const tokens = regex.exec(filterValue)
  if (!tokens) {
    return defaultComparator
  }
  switch (tokens[1]) {
    case '>':
      return (val: any) => parseFloat(val) > parseFloat(tokens[2])
    case '<':
      return (val: any) => parseFloat(val) < parseFloat(tokens[2])
    case '<=':
      return (val: any) => parseFloat(val) <= parseFloat(tokens[2])
    case '>=':
      return (val: any) => parseFloat(val) >= parseFloat(tokens[2])
    case '=':
      return (val: any) => parseFloat(val) === parseFloat(tokens[2])
    case '!':
      return (val: any) => parseFloat(val) !== parseFloat(tokens[2])
  }
  return defaultComparator
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const numericTextFilter = <T extends object>(
  rows: Array<Row<T>>,
  id: IdType<T>,
  filterValue: FilterValue
) => {
  const comparator = parseValue(filterValue)
  return rows.filter((row) => comparator(row.values[id[0]]))
}

// Let the table remove the filter if the string is empty
numericTextFilter.autoRemove = (val: any) => !val
