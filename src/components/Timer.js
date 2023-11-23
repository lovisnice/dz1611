import React, { useState, useEffect } from 'react';

const Timer = () => {
 const [originalCount, setOriginalCount] = useState(0);
 const [count, setCount] = useState(0);
 const [timerStatus, setTimerStatus] = useState('paused');

 const handleSetTime = (seconds) => {
    setCount(seconds);
    setOriginalCount(seconds);
 };

 const handleStart = () => {
    setTimerStatus('started');
 };

 const handlePause = () => {
    setTimerStatus('paused');
 };
 

 const handleReset = () => {
    setCount(originalCount);
    setTimerStatus('paused');
 };

 useEffect(() => {
    let interval;
    if (timerStatus === 'started') {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
 }, [timerStatus]);

 return (
    <div>
      <input type="number" onChange={(e) => handleSetTime(e.target.value)} />
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
      <p>{count}</p>
    </div>
 );
};

export default Timer;