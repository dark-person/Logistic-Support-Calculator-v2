import React, {useState, useEffect} from "react";
import './App.css';

import Topbar from "./Topbar.js";
import ChapterMenu from "./ChapterMenu.js";
import TeamMenu from "./TeamMenu.js";
import TimeMenu from "./TimeMenu.js";
import WeightMenu from "./WeightMenu.js";
import ItemMenu from "./ItemMenu.js";
import EasterEgg from "./EasterEgg.js";
import ResultTable from "./ResultTable.js";

import k_combinations from "./combination.js";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

let data = require("./supportData.json");

function App() {
  // initChapterState:
  // Is a const array, which impliy a state that all chapter is selected
  // (As the chapter state is boolean array at start)
  const initChapterState = new Array(data.chapterList.length).fill(true);

  // emptyChapterState: reverse version of initChapterState
  const emptyChapterState = new Array(data.chapterList.length).fill(false);

  // chapterState: state that used by checkbox
  const [chapterState, setChapterState] = useState(initChapterState);
  
  // Preserved Variable
  // selectedChapter: a list that transfer chapterState to readable list

  // teamNumber: a state that show how many team that user selected
  const [teamNumber, setTeamNumber] = useState(4);

  // filteredSupportList: a list that show the support list is fullfiled time and chapter requirement
  const [filteredSupportList, setFilterSupportList] = useState(getFilteredSupportList(initChapterState, 4, 0));

  // afkHour, afkMin: two variable show afk Time period
  const [afkHour, setAfkHour] = useState(4);
  const [afkMinute, setAfkMinute] = useState(0);

  // weighting: state that store different weighting of resouces
  const [weighting, setWeighting] = useState({
    manpower: 1,
    ammo: 1,
    rations: 1,
    parts: 1
  });

  const [nonZero, setNonZero] = useState(false)
  
  // itemCount: state that store different item count that wanted
  const [itemCount, setItemCount] = useState({
    quickRestoration: 0,
    quickProduction: 0,
    tDollContract: 0,
    equipmentContract: 0,
    token: 0
  });

  // combinationList: list that show what combination is okay
  // its purpose is to display in the table as result
  // it will only change when press the calcute button
  const [combinationList, setCombinationList] = useState([]);

  // showResult: trigger to control display result area or not
  const [showResult, setShowResult] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // This function is to convert Hour and minutes to Minutes
  // Input: hr - Hour
  //        min - Minutes
  // Ouput: Total Time in unit of minutes
  function convertToMinutes(hr,min){
    return hr*60+min;
  }

  // This Function is used to parse chapter state(boolean array) to readable integer list
  // Input: tempState - boolean list of chapterState
  // output: A integer list that show which chapter is selected.
  function parseChapterState(tempState){
    let temp = [];

    // console.log("parseChapterState - tempState = ",tempState);

    for (var i = 0; i < tempState.length ; i++){
      // console.log("parseChapterState - i=",i," bool=",tempState[i]);
      if (tempState[i]){
        temp.push(i);
      }
    }

    return temp;
  }


  // This Function is used to init when reset and open the page
  // input: state - what chapter is selected, is a bool array
  //        = we will transfer to readable array in this function
  //        hour, minute - The time need for a cycle
  // Const: data.detail - the detail of support data
  // Output: an filtered array with time < afkHour*60 + afkMin and chapter requirement
  // !! Cation - This function will not set the value of filteredSupportList in state
  function getFilteredSupportList(state, hour, minute){

    // console.log("getFilteredSupportList - state = ",state);

    let selectedChapter = parseChapterState(state);
    // console.log("getFilteredSupportList - selectedChapter = ",selectedChapter);

    let afkTime = convertToMinutes(hour, minute);
    // console.log("afkTime = ",afkTime);

    if (afkTime === 0)
    {
      afkTime = 999999;
    }

    return data.detail.filter(item => {
      if (selectedChapter.includes(item.chapter)){
        if (item.time <= afkTime){
          return true;
        }
      }
      return false;
    })
  }

  useEffect(() =>{
    });
    
  // A function call when parameter change
  function notifyParameterChange(){
    if (showResult){
      setShowResult(false);
      setShowAlert(true);
      setTimeout(
        ()=> setShowAlert(false),3000)    
    }
  }

  //=========================Basic Part End===========================

  //=========================Chapter Function=========================
  function handleChapterChange(event){

    let temp = chapterState;
    temp[event.target.value] = event.target.checked;

    let filterList = getFilteredSupportList(parseChapterState(chapterState), afkHour, afkMinute);
    console.log(JSON.stringify(filterList,null,4));

    setChapterState(temp);
    setFilterSupportList(filterList);
    notifyParameterChange();
  }

  function clearAllChapter(){
    setChapterState(emptyChapterState);
    // console.log("clearAllChapter - pre-result = ",getFilteredSupportList(emptyChapterState,afkHour,afkMinute));
    setFilterSupportList(getFilteredSupportList(emptyChapterState,afkHour,afkMinute));
    notifyParameterChange();
  }

  function selectAllChapter(){
    setChapterState(initChapterState);
    // console.log("selectAllChapter - pre-result = ",getFilteredSupportList(initChapterState,afkHour,afkMinute));
    setFilterSupportList(getFilteredSupportList(initChapterState,afkHour,afkMinute));
    notifyParameterChange();

  }
  //=========================Chapter Function End=========================

  //=========================Team Function================================

  // Purpose: handle the change of radio button in TeamMenu
  // Input:
  // value: the value of togglebuttongroup
  function handleTeamNumberChange(value){
    setTeamNumber(value);
    notifyParameterChange();
  }
  //=========================Team Function End=========================

  //=========================Time Function============================
  function hourChangeHandler(event){
    let target = event.target;
    let value = (target.value ?
      Math.max(Number(target.min), Math.min(Number(target.max), Number(target.value))) :
      target.value);

    setAfkHour(value);
    setFilterSupportList(getFilteredSupportList(parseChapterState(chapterState), value, afkMinute))
    notifyParameterChange();
  }

  function minuteChangeHandler(event){
    let target = event.target;
    let value = (target.value ?
      Math.max(Number(target.min), Math.min(Number(target.max), Number(target.value))) :
      target.value);

    setAfkMinute(value);
    setFilterSupportList(getFilteredSupportList(parseChapterState(chapterState), afkHour, value))
    notifyParameterChange();
  }
  //=========================Time Function End============================

  //=========================Weight Function============================
  function handleWeightChange(event){
    let target  = event.target;
    let newWeighting = {
      ...weighting,
      [target.name]: (target.value ? 
        (target.value < target.min ? target.min : target.value) : 
        target.value)
    };

    setWeighting(newWeighting); 
    notifyParameterChange();
  }

  function tripleParts(){
    let newWeighting = {
      ...weighting,
      "parts": weighting.parts *3
    };

    setWeighting(newWeighting);
    notifyParameterChange();
  }

  function handleNonZero(event){
    setNonZero(event.currentTarget.checked)
    console.log("Console get:", nonZero)
    notifyParameterChange();
  }

  //=========================Weight Function End============================


  //=========================Item Function============================
  function handleItemChange(event){
    let target = event.target;

    let newItemCount = {
      ...itemCount,
      [event.target.name]: (target.value ? 
        Math.max(Number(target.min), Math.min(Number(target.max), Number(target.value))):
        target.value)
    }

    setItemCount(newItemCount);
    notifyParameterChange();
  }
  //=========================Item Function End============================


  //=========================Final Function===============================

  function resetValues(){
    
    setChapterState(initChapterState);
    setTeamNumber(4);
    setFilterSupportList(getFilteredSupportList(initChapterState, 4, 0));
    setAfkHour(4);
    setAfkMinute(0);

    let oldWeighting = {
      manpower: 1,
      ammo: 1,
      rations: 1,
      parts: 1
    };

    let oldItemCount = {
      quickRestoration: 0,
      quickProduction: 0,
      tDollContract: 0,
      equipmentContract: 0,
      token: 0
    };

    setWeighting(oldWeighting);
    setItemCount(oldItemCount);

    setCombinationList([]);
    notifyParameterChange();
  }

  function submitForm(){
    setCombinationList(calculateResult(teamNumber, filteredSupportList, weighting, itemCount, nonZero));
    setShowResult(true);
    setShowAlert(false);
  }

  function calculateResult(FormationCount, filteredSupportList, weighting, itemCount, nonZero){
    var preResult = k_combinations(filteredSupportList,FormationCount);
    let result = [];

    preResult.forEach(selection => {
      let object = {
        "combination": "",
        "manpower": 0,
        "ammo": 0,
        "rations": 0,
        "parts": 0,
        "quickRestoration":0, 
        "quickProduction":0, 
        "tDollContract":0, 
        "equipmentContract":0, 
        "token":0,
        "totalResource":0,
        "value": 0
      };
      selection.forEach(item => {
        //console.log("item : "+JSON.stringify(item,null,4));
        object.combination = (object.combination === "" ? item.code : object.combination+", "+item.code);

        object.manpower = object.manpower + item.manpower;
        object.ammo = object.ammo + item.ammo;
        object.rations = object.rations + item.rations;
        object.parts = object.parts + item.parts;
        
        object.quickRestoration = object.quickRestoration + item.quickRestoration;
        object.quickProduction = object.quickProduction + item.quickProduction;
        object.tDollContract = object.tDollContract + item.tDollContract;
        object.equipmentContract = object.equipmentContract + item.equipmentContract;
        object.token = object.token + item.token;
      });

      object.quickRestoration = (object.quickRestoration ? object.quickRestoration : "");
      object.quickProduction = (object.quickProduction ? object.quickProduction : "");
      object.tDollContract = (object.tDollContract ? object.tDollContract : "");
      object.equipmentContract = (object.equipmentContract ? object.equipmentContract : "");
      object.token = (object.token ? object.token : "");

      object.totalResource = object.manpower+object.ammo+object.rations+object.parts;
      object.value = object.manpower * weighting.manpower+
        object.ammo * weighting.ammo + object.rations * weighting.rations +
        object.parts * weighting.parts;

      if (object.quickRestoration >= itemCount.quickRestoration &&
        object.quickProduction >= itemCount.quickProduction && 
        object.tDollContract >= itemCount.tDollContract &&
        object.equipmentContract >= itemCount.equipmentContract &&
        object.token >= itemCount.token){
          result.push(object); 
      }
    });

    if (nonZero) {
      result = result.filter(object => object.manpower > 0 && object.ammo > 0 && object.rations > 0 && object.parts > 0);
    }

    result.sort(compare);
    
    result = result.slice(0,30);
    return result;
  }

  function compare(a,b){
    if (a.value > b.value){
      return -1;
    } else if (a.value < b.value){
      return 1;
    } else if (a.value === b.value){
      if (a.totalResource > b.totalResource){
        return -1;
      } else if (a.totalResource < b.totalResource){
        return 1;
      } else {
        return 0;
      }
    }
  }



  // Default Order: Desc Order
  function dynamicSort(property) {
      var sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {
          var result = (a[property] > b[property]) ? -1 :
            (a[property] < b[property]) ? 1 : 
              (a["value"] > b["value"]) ? -1 :
                (a["value"] < b["value"]) ? 1 : 0 ;
          
          // console.log("dynamicSort[",property,"(",sortOrder,")] - ",
          //   a.combination,"(",a[property],",",a.value,")","&",
          //   b.combination,"(",b[property],",",b.value,")",
          //   " Result : ",result);
          return result * sortOrder;
      }
  }

  // Debug Usage
  function sortCombinationList(property){
    console.log("Received! ",property);
    let temp = combinationList.sort(dynamicSort(property));

    console.log("Pre-Result: ",JSON.stringify(temp,null,4));
    setCombinationList(temp);
  }

  //=========================Final Function End===============================

  return (
    <div>
      <Topbar />

      <Container className="mx-auto my-auto">
        <Row className="h-100" xs={1} md={2} lg={3}>
          <Col xs={true}>
            <ChapterMenu
              chapterStatus={chapterState}
              chapterHandler={handleChapterChange}
              selectAllHandler={selectAllChapter}
              clearAllHandler={clearAllChapter} 
            />
          </Col>

          <Col className="d-none d-md-block d-lg-none">
            <EasterEgg />
          </Col>
          
          <Col xs={true}>
            <div className="grid">
              <TeamMenu
                teamCount={teamNumber}
                teamChangeHandler={handleTeamNumberChange}
                />
              <TimeMenu 
                afkHour={afkHour}
                afkMin={afkMinute}
                hourChangeHandler={hourChangeHandler}
                minuteChangeHandler={minuteChangeHandler}
                />
            </div>           
          </Col>

          <Col >
            <WeightMenu
              manpower={weighting.manpower}
              ammo={weighting.ammo}
              rations={weighting.rations}
              parts={weighting.parts}
              weightChangeHandler={handleWeightChange}
              tripleHandler={tripleParts} 
              nonZero={nonZero}
              nonZeroHandler={handleNonZero}
              />
          </Col>

        </Row>

        <Row className="h-100">
          <Col xs={true}>
            <ItemMenu 
              itemCount={itemCount}
              itemHandler={handleItemChange}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={true}>
            <div className="grid">
              <Row className="text-center">
                <Col xl={{offset:1, span:4}} lg={{offset: 2, span: 2}} md={{offset: 3, span: 2}} sm={{offset: 1, span: 4}} xs={{offset:1, span:4}}>
                  <Button variant="danger" onClick={resetValues} block>重設</Button>
                </Col>
                <Col xl={{offset:1, span:4}} lg={{offset: 3, span: 2}} md={{offset: 1, span: 2}} sm={{offset: 2, span: 4}} xs={{offset:1, span:4}}>
                  <Button variant="success" onClick={submitForm} block>計算</Button>
                </Col>
              </Row>
              
            </div>
          </Col>
        </Row>

        {
          showAlert && 
          <Row>
            <Col>
              <div className="grid alert-grid">
                <h4 className="title caution-description">提醒</h4>
                <p className="caution-description section">偵察到參數變更，計算結果重置。</p>
                <p>此提醒3秒後消失。</p>
              </div>
            </Col>
          </Row>
        }

        { showResult && 
          <Row>
            <Col id="result-area">
              <div className="grid">
                <ResultTable data={combinationList} dynamicSort={dynamicSort}/>
              </div>
            </Col>
          </Row>
        }
      </Container>

      {/*<div className="development-area">
          <h3>Chapter: {parseChapterState(chapterState).join()}</h3>
          <h3>Minutes: {convertToMinutes(afkHour,afkMinute)}</h3>
          <h3>Formation Count: {teamNumber}</h3>
          <p>Filtered List: {filteredSupportList.map(item=> item.code).join(",")}</p>

          <br/>
          <h3>ManPower Weight: {weighting.manpower ? weighting.manpower : 0}</h3>
          <h3>Ammo Weight: {weighting.ammo ? weighting.ammo : 0}</h3>
          <h3>Rations Weight: {weighting.rations ? weighting.rations : 0}</h3>
          <h3>Parts Weight: {weighting.parts ? weighting.parts : 0}</h3>
          <br />

          <h3>Quick Restoration Count : {itemCount.quickRestoration ? itemCount.quickRestoration : 0}</h3>
          <h3>Quick Production Count: {itemCount.quickProduction ? itemCount.quickProduction : 0}</h3>
          <h3>T Doll Contract: {itemCount.tDollContract ? itemCount.tDollContract : 0}</h3>
          <h3>Equipment Contract: {itemCount.equipmentContract ? itemCount.equipmentContract : 0}</h3>
          <h3>Token: {itemCount.token ? itemCount.token : 0}</h3>
        </div>*/}
    </div>
  )
}

export default App;
