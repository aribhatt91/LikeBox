import React, { useState } from 'react';
import AppMessage from '../AppMessage';
import './style.component.css';

function Counter({handler, limit, limit_msg, name, label, initial_count, size}){
    const [val, setVal] = useState(initial_count || 0);
    const [limitReached, setLimitReached] = useState((limit ? val >= limit : false));
    const decrement = () => {
      if(val > 0){
        let temp = val - 1;
        setVal(temp);
        if(handler){
          handler(name, temp);
        }
      }
    },
    increment = () => {
      if(limit && val >= limit){
        setLimitReached(true);
      }else {
        let temp = val + 1;
        setVal(temp);
        if(handler){
          handler(name, temp);
        }
      }
    }
  
    return (
      <div className={"app-counter d-inline-block clearfix pt-3 pb-3" + (size ? " app-counter--" + size : "")}>
        <div className="app-counter__label mb-2">{label}</div>
        <div className="app-counter__input-wrapper d-inline-flex clearfix">
          <button type="button" className="decrement" disabled={val <= 0} onClick={decrement}>-</button>
          <input type="number" value={val} onChange={()=>{}}/>
          <button type="button" className="increment" disabled={limitReached} onClick={increment}>+</button>
        </div>
        {limitReached && <AppMessage type="error" size="sm" text={limit_msg || `You may not add more units of this item`}/>}
      </div>
    )
  }
export default Counter;