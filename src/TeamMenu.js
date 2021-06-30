import React from "react";
import './App.css';

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

// Required Props:
// teamCount - From state in App.js
// teamChangeHandler - Handler of formation change
function TeamMenu(props){
	return (
		<div>
			<h4 className="title">梯隊數：</h4>
			<div className="radio-section">
				<ToggleButtonGroup name="formation"
					type="radio" defaultValue={props.teamCount} value={props.teamCount} onChange={props.teamChangeHandler}>
					<ToggleButton className="radio" size="lg" variant="outline-purple" value={1}>1</ToggleButton>
					<ToggleButton className="radio" size="lg" variant="outline-purple" value={2}>2</ToggleButton>
					<ToggleButton className="radio" size="lg" variant="outline-purple" value={3}>3</ToggleButton>
					<ToggleButton className="radio" size="lg" variant="outline-purple" value={4}>4</ToggleButton>
				</ToggleButtonGroup>
			</div>
			
		</div>
		)
}

export default TeamMenu;

