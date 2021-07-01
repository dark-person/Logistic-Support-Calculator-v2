import React, {useState, useEffect} from "react";
import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Table from 'react-bootstrap/Table'

function DataRow({rowData, allStyle}){
	return(
			<tr className="d-flex">
				<td style={allStyle['combination']}>{rowData.combination}</td>
				<td style={allStyle['manpower']}>{rowData.manpower}</td>
				<td style={allStyle['ammo']}>{rowData.ammo}</td>
				<td style={allStyle['rations']}>{rowData.rations}</td>
				<td style={allStyle['parts']}>{rowData.parts}</td>
				<td style={allStyle['quickRestoration']}>{rowData.quickRestoration}</td>
				<td style={allStyle['quickProduction']}>{rowData.quickProduction}</td>
				<td style={allStyle['tDollContract']}>{rowData.tDollContract}</td>
				<td style={allStyle['equipmentContract']}>{rowData.equipmentContract}</td>
				<td style={allStyle['token']}>{rowData.token}</td>
				<td style={allStyle['value']}>{rowData.value}</td>
				<td style={allStyle['totalResource']}>{rowData.totalResource}</td>
			</tr>
		)
}

// Will not include onClick function to prevent binding issue
function ResultTableHeader({label, style, status, handler}){

	const none = 0;
	const asec = -1;
	const desc = 1;

	return (
		<th style={style} onClick={handler}>
		{
			label + "" + (status === none ? "" : status === asec ? "▲" : status === desc ? "▼" : "")
		}
		</th>
		);
}

function ResultTable({data, dynamicSort}){

	const none = 0;
	const asec = -1;
	const desc = 1;

	const fieldLabel = {
		manpower: "人力/次",
		ammo: "彈藥/次",
		rations: "口糧/次",
		parts: "零件/次",
		quickRestoration: "快速修理契約",
		quickProduction: "快速製造契約",
		tDollContract: "人形契約",
		equipmentContract: "裝備契約",
		token: "採購幣",
		value: "值",
		totalResource: "資源總量"
	}

	const fieldList = [
		"manpower", "ammo", "rations" ,"parts", 
		"quickRestoration", "quickProduction", "tDollContract", "equipmentContract", "token",
		"value", "totalResource"
	]

	const initFieldStatus = {
		manpower: none,
		ammo: none,
		rations: none,
		parts: none,
		quickRestoration: none,
		quickProduction: none,
		tDollContract: none,
		equipmentContract: none,
		token: none,
		value: none,
		totalResource: none
	};

	const [displayData, setDisplayData] = useState(data);

	const [fieldStatus, setFieldStatus] = useState(initFieldStatus);

	useEffect(() => { 
		setDisplayData(JSON.parse(JSON.stringify(data))) }
		, [data]);

	const getColumnWidth = (rows, accessor, headerText) => {
    	const maxWidth = 200
    	const magicSpacing = 20
      	const cellLength = Math.max(
        	...rows.map(row => (`${row[accessor]}` || '').length),
          	headerText.length,
        	)
      	return Math.min(maxWidth, cellLength * magicSpacing)+1
  	}

  	function switchStatus(field){
  		let currentValue = fieldStatus[field];

  		let result = (currentValue === none) ? desc : 
  			(currentValue === desc) ? asec : 
  				(currentValue  === asec) ? none : none;

  		setFieldStatus({
  			...initFieldStatus,
  			[field] : result
  		});

  		return result;
  	}

  	const allStyle = {
  		combination: {
  			width: getColumnWidth(data, "combination", "後勤組合")
  		},
  		manpower: {
  			width: getColumnWidth(data, "manpower", "人力/次"),
  			textAlign: "center"
  		},
  		ammo: {
  			width: getColumnWidth(data, "ammo", "彈藥/次"),
  			textAlign: "center"
  		},
  		rations: {
  			width: getColumnWidth(data, "rations", "口糧/次"),
  			textAlign: "center"
  		},
  		parts:{
  			width: getColumnWidth(data, "parts", "零件/次"),
  			textAlign: "center"
  		},
  		quickRestoration: {
  			width: getColumnWidth(data, "quickRestoration", "快速修理契約"),
  			textAlign: "center"
  		},
  		quickProduction: {
  			width: getColumnWidth(data, "quickProduction", "快速製造契約"),
  			textAlign: "center"
  		},
  		tDollContract: {
  			width: getColumnWidth(data, "tDollContract", "人形契約"),
  			textAlign: "center"
  		},
  		equipmentContract: {
  			width: getColumnWidth(data, "equipmentContract", "裝備契約"),
  			textAlign: "center"
  		},
  		token: {
  			width: getColumnWidth(data, "token", "採購幣"),
  			textAlign: "center"
  		},
  		value: {
  			width: getColumnWidth(data, "value", "值"),
  			textAlign: "center"
  		},
  		totalResource: {
  			width: getColumnWidth(data, "totalResource", "資源總量"),
  			textAlign: "center"
  		}
  	};

  	function handleSortTrigger(event, field){
  		console.log("Triggered! ", field);

  		let status = switchStatus(field);

  		let temp = JSON.parse(JSON.stringify(data));

  		if (status === desc){
  			temp.sort(dynamicSort(field))
  		} else if (status === asec) {
  			temp.sort(dynamicSort("-"+field))
  		}
  		
  		setDisplayData(temp);
  	}

  	
	return (
		<div>
			<h4 className="title">計算結果：</h4>
			{
				data.length === 0 ? 
					<div className="section">沒有計算結果</div> :
					<div className="scrollable section">
						<Table striped bordered hover size="sm" variant="dark">	
						<thead>
							<tr className="d-flex">
								<th style={allStyle['combination']}>後勤組合</th>
								{
									fieldList.map(item => 
										<ResultTableHeader key={"tableheader-"+item} label={fieldLabel[item]} 
											style={allStyle[item]} status={fieldStatus[item]}
											handler={e => handleSortTrigger(e, item)}/>
									)
								}
							</tr>
						</thead>
						<tbody>
							{displayData.map((item, index) => 
								<DataRow key={item.combination} rowData={item} allStyle={allStyle} />)} 
						</tbody>
					</Table>
					</div>
			}
		</div>
		);
}

export default ResultTable;