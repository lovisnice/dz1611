import React, { useState, useEffect } from 'react';

const Timer = () => {
 const [originalCount, setOriginalCount] = useState(0);
 const [count, setCount] = useState(0);
 const [timerStatus, setTimerStatus] = useState('paused');

 const handleSetTime = (seconds) => {
    setCount(seconds);
    setOriginalCount(seconds);
    setTimerStatus();
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
    if(originalCount !== 0 && originalCount >= 0)
    {
        if (timerStatus === 'started') {
            interval = setInterval(() => {
                    setCount((prevCount) => {
                        if (prevCount !== 0) {
                          return prevCount - 1;
                        } else {
                          clearInterval(interval); // Stop the interval when prevCount reaches 0
                          setTimerStatus('paused');
                          return 0;
                        }
                      });
                    }, 1000);
          }
    }
    
    return () => clearInterval(interval);
 }, [timerStatus]);

 return (
    <div style={styles.container}>
        <p style={styles.timer}>{count}</p>
    <input
      type="number"
      onChange={(e) => handleSetTime(e.target.value)}
      style={styles.input}
    />
     <div style={styles.buttonContainer}>
        <button onClick={handleStart} style={styles.button}>Start</button>
        <button onClick={handlePause} style={styles.button}>Pause</button>
        <button onClick={handleReset} style={styles.button}>Reset</button>
      </div>
    
  </div>
 );
};

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',
      },
    input: {
      margin: '10px',
      padding: '5px',
      fontSize: '16px',
    },
    button: {
      margin: '5px',
      padding: '10px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    timer: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
  };

export default Timer;