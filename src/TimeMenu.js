import React from "react";
import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';

// Required Props:
// afkHour - Hour input
// afkMin - Minutes input
// hourChangeHandler - handler of hour change
// minuteChangeHandler - handler of minutes change
function TimeMenu(props){

	return (
		<div>
			<h4 className="title">間隔時間：</h4>	
			<Form className="section">
				<Row noGutters>
					<Col>
						<Form.Control
							as="input"
							className="timebox"
							type="number"
							name="afkHour"
							min="0"
							max="24" 
							value={props.afkHour}
							onChange={props.hourChangeHandler}
							onWheel={(e) => e.target.blur()}
							/>
					</Col>
					<Col>
						<h5 className="label">小時</h5>
					</Col>
					<Col>
						<Form.Control 
							as="input"
							className="timebox"
							type="number"
							name="afkMin"
							min="0"
							max="59"
							value={props.afkMin}
							onChange={props.minuteChangeHandler}
							onWheel={(e) => e.target.blur()}
							/>
					</Col>
					<Col>
						<h5 className="label">分鐘</h5>
					</Col>
				</Row>
			</Form>
		</div>
		)
}

export default TimeMenu;

