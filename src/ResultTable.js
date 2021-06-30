import React from "react";
import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useTable } from 'react-table'

function ResultTable({data}){

	const columns = React.useMemo(
    	() => [
      		{
    	    	Header: 'Name',
    	    	columns: [
          			{
            			Header: 'First Name',
            			accessor: 'firstName',
          			},
          			{
            			Header: 'Last Name',
            			accessor: 'lastName',
          			},
        		],
      		},
      		{
    		    Header: 'Info',
        		columns: [
          			{
            			Header: 'Age',
            			accessor: 'age',
          			},
          			{
            			Header: 'Visits',
            			accessor: 'visits',
          			},
          			{
            			Header: 'Status',
            			accessor: 'status',
          			},
          			{
            			Header: 'Profile Progress',
            			accessor: 'progress',
          			},
        		],
      		},
    ],
    []
  )

	const {
		getTableProps,
	    getTableBodyProps,
	    headerGroups,
	    rows,
	    prepareRow,
	} = useTable({
	    columns,
	    data,
	})

	return(
		<div className="grid">
			<h4 className="title">計算結果：</h4>
			<table {...getTableProps()} >
				<thead>
				    {headerGroups.map(headerGroup => (
				      <tr {...headerGroup.getHeaderGroupProps()}>
				        {headerGroup.headers.map(column => (
				          <th {...column.getHeaderProps()}>{column.render('Header')}</th>
				        ))}
				      </tr>
				    ))}
				</thead>
				<tbody {...getTableBodyProps()}>
			        {rows.map((row, i) => {
			          prepareRow(row)
			          return (
			            <tr {...row.getRowProps()}>
				              {row.cells.map(cell => {
				                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
				              })}
				        </tr>
				        )
				    })}
				</tbody>
			</table>
		</div>
		)
}

export default ResultTable;