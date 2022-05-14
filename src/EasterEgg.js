import React from "react";
import './App.css';

import Image from 'react-bootstrap/Image'

import egg from "./waifu-min.gif";

function EasterEgg(props){
	return(
		<div className="grid">
			<h4 className="title">這是我老婆萌萌躂</h4>
			<div className="section">
				<Image src={egg} fluid />
			</div>
		</div>)
}

export default EasterEgg;