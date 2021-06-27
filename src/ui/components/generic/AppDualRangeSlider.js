import React from 'react';
import ReactSlider from 'react-slider';

export default function AppDualRangeSlider({min=0, max=100, onChange}) {
    return (
        <div className="app-dual-range-slider w-100">
            <ReactSlider
                className="horizontal-slider"
                thumbClassName="range-slider-thumb"
                trackClassName="range-slider-track"
                defaultValue={[min, max]}
                onChange={onChange}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                pearling
                minDistance={10}
            />
        </div>
    )
}

 