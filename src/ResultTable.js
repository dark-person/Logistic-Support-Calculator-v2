import React from "react";
import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import BTable from 'react-bootstrap/Table';

import { useTable } from 'react-table'

function ResultTable({data}){

	const columns = React.useMemo(
    	() => [
      		{
      			Header: "後勤組合",
      		    accessor: "combination",
      		},
      		{
      			Header: "人力/次",
      			accessor: "manpower",
      		},
      		{
      		    Header: "彈藥/次",
      			accessor: "ammo",
      		},
      		{
      			Header: "口糧/次",
      			accessor: "rations",
      		},
      		{
      			Header: "零件/次",
      			accessor: "parts",
      		},
      		{
      			Header: "快速修理契約",
      			accessor: "quickRestoration",
      		},
      		{
      			Header: "快速製造契約",
      			accessor: "quickProduction",
      		},
      		{
      			Header: "人形契約",
		   		accessor: "tDollContract",
      		},
      		{
      			Header: "裝備契約",
      		    accessor: "equipmentContract",
      		},
      		{
      		   	Header: "採購幣",
      		   	accessor: "token",
     		},
      		{
				Header: "值",
      			accessor: "value",
      		},
      		{
      			Header: "資源總量",
      			accessor: "totalResource",
      		}
      		
    	],[]
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
			<BTable striped bordered hover variant="dark" size="sm" {...getTableProps()}>
				<thead>
					{headerGroups.map(headerGroup => (
					  <tr {...headerGroup.getHeaderGroupProps()}>
					    {headerGroup.headers.map(column => (
					      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
					    ))}
					  </tr>
					))}
				</thead>
				<tbody>
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
			</BTable>
			{/*<table {...getTableProps()} >
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
			</table>*/}
		</div>
		)
}

export default ResultTable;