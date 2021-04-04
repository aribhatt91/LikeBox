import React, { Component, useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';


export default function AppDualRangeSlider() {
    const [currMax, setCurrMax] = useState(100);
    const [currMin, setCurrMin] = useState(0);
    const [touched, setTouched] = useState(0);

    const calculateMinValue = (val) => {
        
        setCurrMin(Number(val) < currMax + 2 ? Number(val) : currMax + 2);
        console.log('currMin', val, 'currMax', currMax, touched);
    }
    const calculateMaxValue = (val) => {
        setCurrMax(Number(val) > currMin + 2 ? Number(val) : currMin + 2);
        console.log('currMin', currMin, 'currMax', val, touched);
    }
    return (
        <div className="center">
            <div className="cont-wrap">
            <div className="d-inline-block w-100" onMouseDown={() => setTouched(0)}>
                <RangeSlider
                    value={currMin}
                    disabled={touched === 0 && (currMin + 2) >= currMax}
                    onChange={e => calculateMinValue(e.target.value)}
                    tooltip='off'
                    min={0}
                    max={100}
                />
            </div>
            <div className="d-inline-block float-right w-100" onMouseDown={() => setTouched(1)}>
                <RangeSlider
                    value={currMax}
                    disabled={touched === 1 && (currMin + 10) >= currMax && currMax !== currMin + 2}
                    onChange={e => calculateMaxValue(e.target.value)}
                    tooltip='off'
                    min={0}
                    max={100}
                
                />
            </div>
         </div>
      </div>
    )
}
