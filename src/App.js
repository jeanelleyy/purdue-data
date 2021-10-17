import React, { useEffect, useState, useRef } from 'react';
import { CSVLink, CSVDownload } from 'react-csv';
import axios from 'axios';
import './App.css';
import Level from './Level';
import Start from './Start';
import DataDisplay from './DataDisplay';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {

  const LOA1Imgs = require.context('./LOA_1/', true, /\.png$/);
  const LOA1 = LOA1Imgs.keys().map(path=>{
    let imgId = path.indexOf("_");
    let correctNum = path.lastIndexOf("_");
    return {
      path, 
      file: LOA1Imgs(path), 
      id: path.substring(3,imgId), 
      weapons:path.substring(correctNum+1,correctNum+2), 
      isValid:true
    };
  });

  const LOA3Imgs = require.context('./LOA_3/', true, /\.png$/);
  const LOA3 = LOA3Imgs.keys().map(path=>{
    let imgId = path.indexOf("_");
    let correctNum = path.lastIndexOf("_");
    return {
      path, 
      file: LOA3Imgs(path), 
      id: path.substring(3,imgId), 
      weapons:path.substring(correctNum+1,correctNum+2), 
      isValid:true
    };
  });

  const LOA91Imgs = require.context('./LOA_9/LOA_9_1/', true, /\.png$/);
  const LOA91 = LOA91Imgs.keys().map(path=>{
    let imgId = path.indexOf("_");
    let correctNum = path.lastIndexOf("_");
    return {
      path, 
      file: LOA91Imgs(path), 
      id: path.substring(3,imgId), 
      weapons:path.substring(correctNum+1,correctNum+2), 
      isValid:true
    };
  });

  const LOA92Imgs = require.context('./LOA_9/LOA_9_2/', true, /\.png$/);
  const LOA92 = LOA92Imgs.keys().map(path=>{
    let imgId = path.indexOf("_");
    let correctNum = path.lastIndexOf("_");
    return {
      path, 
      file: LOA92Imgs(path), 
      id: path.substring(3,imgId), 
      weapons:path.substring(correctNum+1,correctNum+2),
      isValid:true
    };
  });

  const [startData, setStart] = useState({});
  const [mData, setMData] = useState([]);
  const [cData, setCData] = useState([]);
  const [nextLevel, setNext] = useState(false);
  const [levelIndex, setLevel] = useState(0);
  const [trials, setTrials] = useState(0);
  const [transitionDone, setTransition] = useState(false);
  const [user_id, setId] = useState("user");
  const [isCalled, setCall] = useState(false);
  const secondFile = useRef(null);
  const order = [1, 3, 91, 92];
  const images = [LOA1, LOA3, LOA91, LOA92];

  // reset parameters for next level
  useEffect(()=>{
    if(nextLevel == true){
        setLevel(levelIndex + 1);
        setTrials(0);
        setNext(false);
        setTransition(false);
    }
  }, [nextLevel]);

  // update the display when the transition screens are done
  useEffect(()=>{
    if(transitionDone){
      getDisplay();
    }
  }, [transitionDone]);

  // send the data when the experiment is done
  useEffect(()=>{
    sendData(mData.concat(cData));
  }, [isCalled]);

  //takes data from experiment and makes POST request to heroku
  async function sendData(data){
    console.log("calling sendData");
    let myobj = {user_id:user_id, rows: data};
    console.log(myobj);
    await axios.post(`https://wix-server.herokuapp.com/`, 
      myobj
    )
    .then(res => {
      console.log(res);
      console.log(res.data);
    });
  }

  //change display based on level completion
  function getDisplay(){
    if(levelIndex <= 3){
      if(transitionDone){
        return <Level 
          mdata={mData}
          setMData={setMData} 
          cdata={cData}
          setCData={setCData} 
          images={images[levelIndex]} 
          trials={trials} 
          setTrials={setTrials} 
          nextLevel={setNext} 
          levelType={order[levelIndex]}
          startData={startData}
        ></Level>
      }
      else{
        return <Start setUser={setId} levelIndex={levelIndex} startData={startData} setStart={setStart} setTransition={setTransition}></Start>
      }
      
    }
    else{
      // allow data to be sent only once
      if (isCalled){
        return (
          <div className="survey-style">
            <h1>You are now done with the experiment. Thank you for your time.</h1>
          </div>
          
        );
      }
      else{
        setCall(true);

        return (
          <div className="survey-style">
            <h1>You are now done with the experiment. Thank you for your time.</h1>
          </div>
          
        );
      }
    }
  }

  return (
    <div>
      <DataDisplay/>
    </div>
    

  );
}

export default App;
