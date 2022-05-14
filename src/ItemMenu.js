import React from "react";
import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';

function ItemInput(props){
  return (
    <Form.Control
      as="input"
      className="itembox"
      name={props.name}
      type="number"
      min="0"
      max="4"
      value={props.value}
      onChange={props.Handler} 
      onWheel={(e) => e.target.blur()}
    />
    );
}

function ItemCol(props){

	return(
		<Col>
			<Row noGutters>
				<Col>
					<h5 className="label mx-3">{props.label}</h5>
				</Col>
				<Col xs={true}>
					<ItemInput
						name={props.name}
						value={props.value}
						Handler={props.Handler}
						/>
				</Col>
				<Col xs={1}>
					{"  "}
				</Col>
			</Row>
		</Col>
		)
}

function itemMenu(props){
	return(
		<div className="grid">
			<h4 className="title">道具機率獲得次數：</h4>
			<div className="section">
				<p>後勤有機會獲得道具獎勵，但機率未知，已知大成功會一定列表中的道具。</p>
				<p className="caution-description">而這參數，是以盡量提高某道具的出現率為目的，並非保證能獲得。</p>
				<p>以2-3（代號11 工廠快遞）為例，會有機會出現[快速製造契約]和[快速修理契約]，在這裡[快速製造契約]和[快速修理契約]各為0.5次。</p>
				<p>而1-4（代號8  全境搜查），則只會有機會出現[人形製造契約]，因此，[人形製造契約]為1次。</p>
				<p>目前計算器對次數的限制為：「不能大於4，不能少於0」，然而，次數設得太高，將會令可行組合數量更少，甚至沒有。</p>
				<p><b>理論上，把次數設成1～2次已經有效。</b></p>
			</div>

			<div className="section">
				<Row xs={1} lg={2}>
					<ItemCol
						label="快速修理契約："
						name="quickRestoration"
						value={props.itemCount.quickRestoration}
						Handler={props.itemHandler}
						/>
					<ItemCol
						label="快速製造契約："
						name="quickProduction"
						value={props.itemCount.quickProduction}
						Handler={props.itemHandler}
						/>
					<ItemCol
						label="人形契約:"
						name="tDollContract"
						value={props.itemCount.tDollContract}
						Handler={props.itemHandler}
						/>
					<ItemCol
						label="裝備契約:"
						name="equipmentContract"
						value={props.itemCount.equipmentContract}
						Handler={props.itemHandler}
						/>
					<ItemCol
						label="採購幣:"
						name="token"
						value={props.itemCount.token}
						Handler={props.itemHandler}
						/>
				</Row>
			</div>
		</div>)
}

export default itemMenu;