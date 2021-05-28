import React, {useEffect, useState, useRef} from 'react';
import './App.css';

function App() {
  /* useState */
  const [time, set_time] = useState(30)
  const [timer_start, set_timer_start] = useState(false);

  /* useRef */
  const clock_hand = useRef();
  const plus_button = useRef();
  const minus_button = useRef();
  const reset_button = useRef();
  
  /* useEffect */
  useEffect(() => { /* when time value changes */
    if(time===0) {
      plus_button.current.disabled=false;
      minus_button.current.disabled=false;
      reset_button.current.disabled=false;
      set_timer_start(false);
    }
    const angle = time*6 -90; /* 15초일 때 수평 */
    clock_hand.current.style.transform = `rotate(${angle}deg)`;
  }, [time]);

  useEffect(() => { /* when time_start value changes */
    if(timer_start===false) return;
    const timer = setInterval(() => {
      set_time((prev) => prev-1);
    }, 1000);
    return() => clearInterval(timer);
  }, [timer_start]);

  /* Event Listner */
  const plus_button_Click = (value) => {
    if(time + value > 60) return;   
    set_time(time + value);
  };

  const minus_button_Click = (value) => {
    if(time - value < 0) return;   
    set_time(time - value);
  };

  const reset_button_Click = () => {
    set_time(30);
  };

  const start_button_Click = () => {
    plus_button.current.disabled=true;
    minus_button.current.disabled=true;
    reset_button.current.disabled=true;
    set_timer_start(true);
  };

  return (
    <div className = "contents">
      <h1>Moon Timer</h1>
      <div className = "clock">
        <div ref = {clock_hand} className = "clock_hand"></div>
      </div>
      <div className = "buttons">
        <div className = "timer_settings">
          <span className = "plus_button">
            {/* +5, +1 버튼  비활성화가 안돼요 */}
            <button ref = {plus_button} onClick = {() => plus_button_Click(10)}>+10</button>
            <button ref = {plus_button} onClick = {() => plus_button_Click(5)}>+5</button>
            <button ref = {plus_button} onClick = {() => plus_button_Click(1)}>+1</button>
          </span>
          <span>{time}</span>
          <span className = "minus_button">
            {/* -5, -10 버튼  비활성화가 안돼요 */}
            <button ref = {minus_button} onClick = {() => minus_button_Click(1)}>-1</button>
            <button ref = {minus_button} onClick = {() => minus_button_Click(5)}>-5</button>
            <button ref = {minus_button} onClick = {() => minus_button_Click(10)}>-10</button>
          </span>
          
        </div>
        <div>
          <button ref = {reset_button} className = "reset_button" onClick = {reset_button_Click} >Reset</button>
          <button className = "start_button" onClick = {start_button_Click} >Start</button>
        </div>
      </div>  
    </div>    
  );
}

export default App;
