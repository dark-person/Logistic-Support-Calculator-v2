import React from "react";
import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';	

function ResourceWeightInput(props){
  return(
      <Form.Control
        as="input"
        type="number"
        className="weightbox"
        name={props.name} 
        min="0"
        value={props.value} 
        onChange={props.Handler}
        onWheel={(e) => e.target.blur()}
        />
    );
}

function WeightCol(props){
	return(
		<Col>
			<Row noGutters>
				<Col xs={true}>
					<h5 className="label mx-3">{props.label}</h5>
				</Col>
				<Col xs={true}>
					<ResourceWeightInput
					  name={props.name}
					  value={props.value}
					  Handler={props.Handler}
					/>
				</Col>
				<Col xs={true} id="triple-button-col">
					{props.name==="parts"?<Button variant="outline-purple mx-3" onClick={props.tripleHandler}>x3</Button>:' '}
				</Col>
			</Row>
		</Col>
		)
}

// Required Props:
// manpower
// ammo
// rations
// parts
// weightChangeHandler
// triplehandler
function WeightMenu(props){

	function displayText(selected) {
		if (selected){
			return "禁止數字為零"
		} else {
			return "允許數字為零"
		}
	}

	return (
		<div className="grid">
			<h4 className="title">權重：</h4>
			<Form className="section">
				<Row>
					<WeightCol
						label="人力"
						name="manpower"
						value={props.manpower}
						Handler={props.weightChangeHandler}
					/>
				</Row>
				<Row>
					<WeightCol
						label="彈藥"
						name="ammo"
						value={props.ammo}
						Handler={props.weightChangeHandler}
					/>
				</Row>
				<Row>
					<WeightCol
						label="口糧"
						name="rations"
						value={props.rations}
						Handler={props.weightChangeHandler}
					/>
				</Row>
				<Row>
					<WeightCol
						label="零件"
						name="parts"
						value={props.parts}
						Handler={props.weightChangeHandler}
						tripleHandler={props.tripleHandler}
					/>
				</Row>
				<Row>
					<Col><h5 className="label mx-3">資源數量</h5></Col>
					<Col>
						<ToggleButtonGroup type="checkbox" name="toggleButton">
							<ToggleButton
        						className="mb-2"
  						        id="toggle-check"
        						variant="outline-purple"
        						checked={props.nonZero}
								value="1"
								onChange={props.nonZeroHandler}
      						>{displayText(props.nonZero)}
      						</ToggleButton>
						</ToggleButtonGroup>
					</Col>	
				</Row>
			</Form>
		</div>
		)
}

export default WeightMenu;