import React from 'react'
const PROPS = {
    rows
}
const STATE = {
    maxRows: 10,
    selectState: 0,//Possible values - 0: NONE, 1: SOME, 2:ALL,
    loading,
    selectedRows: [],//rowIds
    filterTerm,
    sort: {
        by: 'id',
        order: 0 // 0: ASCENDING, 1: DESCENDING
    },
    columns: [
        {
            name,
            id,//same as attributes of rows
            show,
            sortable,//boolean
            sortFunction, //TODO
            sortOrder // 0: ASCENDING, 1: DESCENDING
        }
    ],
    rows: [
        {
            id,
            ...attributes,
            selected,

        }
    ],
    options: [],
}
const API = {
    setRowCount,
    selectAll,
    unselectAll,
    selectRow,
    sort,
    nextPage,
    prevPage,
    filterRows //Search component
}
export default function DataTable() {
  return (
    <div>DataTable</div>
  )
}
