import './App.css'
import { useEffect, useState } from 'react';



function App() {


const [isStart, setStart] = useState(false);
const [hours, setHours] = useState(0);
const [minutes, setMinutes] = useState(0);
const [seconds, setSeconds] = useState(0);
const [timerid, setTimerId] = useState(0);

const handleStart = ()=>{
  setStart(true);
}
const handleReset = ()=>{
  setStart(false);
}

const handleInput = (e)=>{
const value = parseInt(e.target.value);
const id = e.target.id;
if(id == 'hours'){
  setHours(value);
}
else if(id == 'minute'){
  setMinutes(value)
}
else{
  setSeconds(value);
}
}

const runTimer = (sec,min, hr, tid) =>{
  if(sec > 0){
    setSeconds((s)=> s-1);
  }
  else if(sec === 0 && min > 0){
    setMinutes((m)=> m-1);
    setSeconds(59);
  }
  else if (hr > 0 ){
    setHours((h)=> h-1);
    setMinutes(59);
    setSeconds(59);
  }
  else{
    setStart(false);
  //  clearInterval(tid);
  }
}



useEffect(()=>{
let tid;
if(isStart){
  tid = setInterval(()=>{
    runTimer(seconds,minutes,hours,tid)
  }, 1000)
setTimerId(tid)
}
return ()=>{
  clearInterval(tid);
}
},[isStart, hours,minutes,seconds])


  return (
   <div className='App'>
      <h1>Countdown Timer</h1>
     {!isStart &&  <div className='input-container'>
        <div className='input-box'>
          <input onChange={handleInput} id="hours" placeholder='HH' />
          <input onChange={handleInput} id="minute" placeholder="MM"/>
          <input onChange={handleInput} id="second" placeholder="SS"/>
       
        </div>
        <button className='btn-start' onClick={handleStart}>Start</button>
      </div>}

    {
    isStart &&   <div>
        <div>
        <div>{hours}</div>
        <span>:</span>
        <div>{minutes}</div>
        <span>:</span>
        <div>{seconds}</div>
        </div>
        <div>
          <button>Pause</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>}
   </div>
  )
}

export default App
