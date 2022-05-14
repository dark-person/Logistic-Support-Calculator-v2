import React from "react";
import './App.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

let data = require("./supportData.json");

function ChapterBox(props){
  return (
    <Form.Check inline 
      type="checkbox"
      checked={props.chapterStatus}
      onChange={props.chapterHandler}
      value={props.chapterId}
      id={props.chapterId}
      label={"第"+data.chineseNumber[props.chapterId]+"戰役"}
      />
    );
}

// Require Props:
// chapterStatus - a array show the status of which chapter selected
// chapterHandler - put handleChapterChange function in App.js is okay
// selectAllHandler - 
// clearAllHandler - 
function ChapterMenu(props){
	return (
		<div className="grid">
			<h4 className="title">戰役進度：</h4>
			<div className="checkbox-section">
				{
					data.chapterList.map(item =>
						 <ChapterBox key={item}
            				chapterId={item}
            				chapterStatus={props.chapterStatus[item]}
            				chapterHandler={props.chapterHandler}
            			/>
					)
				}
			</div>
			<Button 
				variant="outline-success"
				onClick={props.selectAllHandler}>
				全選
			</Button> {''}
			<Button 
				variant="outline-secondary"
				onClick={props.clearAllHandler}>
				清空
			</Button>
		</div>
		);
}

export default ChapterMenu;