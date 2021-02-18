import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import AppButton from './generic/AppButton';

function LikeBoxSlider({label, min=0, max=100, onChange}) {
    const [value, setValue] = useState(0)
    //const [displayValue, setDisplayValue] = useState(0)
    const [unit, setUnit] = useState('cm') 

    let displayValue = unit == 'cm' ? value : Math.round(value * 0.393701)
    const calculateValue = (val) => {
        let res = val;
        /* if(val === 0){res = min;}
        else if(val === 100){res = max;}
        else {
            res = Math.round((val/100) * (max-min)) + min;
        } */
        if(res !== value) {
            setValue(res)
            if(typeof onChange === 'function'){
                onChange(res)
            }
        }
    }
    const changeUnit = (new_unit) => {
        if(new_unit === unit){return}
        setUnit(new_unit)
    }
    return (
        <div className="like-box-slider-wrapper d-flex flex-column">
            <div className="like-box-slider-text-container d-flex justify-content-between align-items-center">
                <div className="like-box-slider-label align-items-center">{label}</div>
                <div className="like-box-slider-unit-container d-inline-flex align-items-center">
                    <div className="like-box-slider-value d-inline-flex mr-2">{displayValue === 0? "" : displayValue }</div>
                    <div className="like-box-slider-unit-btns d-inline-flex">
                        <button type="button" className={"like-box-unit-btn btn-left" + (unit === 'cm' ? ' active': '')} onClick={() => changeUnit('cm')}>cm</button>
                        <button type="button" className={"like-box-unit-btn btn-right" + (unit === 'in' ? ' active': '')} onClick={() => changeUnit('in')}>inch</button>
                    </div>
                </div>
            </div>
            
            <div className="like-box-slider-container">
                <RangeSlider
                    value={value}
                    onChange={e => calculateValue(e.target.value)}
                    tooltip='off'
                    min={min}
                    max={max}
                />
            </div>
            
        </div>
    )
}

export default function LikeBoxPreference() {
    const [ value, setValue ] = useState(25);
    const onInputChange = (name, val) => {
        console.log(name, val)
    }
    const submit = () => {

    }
    return (
        <div className="like-box-preference">
        <h2 className="align-text-center pl-3 pr-3 mb-4">Add your sizes so that we can ensure that everything you order will fit you perfectly</h2>
        <LikeBoxSlider
            min={0}
            max={100}
            label="Head circumference"
            onChange={(val) => onInputChange('head', val)}
        />
        <LikeBoxSlider
            min={0}
            max={100}
            label="Neck"
            onChange={(val) => onInputChange('neck', val)}
        />
        <LikeBoxSlider
            min={0}
            max={100}
            label="Chest"
            onChange={(val) => onInputChange('chest', val)}
        />
        <LikeBoxSlider
            min={0}
            max={100}
            label="Waist"
            onChange={(val) => onInputChange('waist', val)}
        />
        <LikeBoxSlider
            min={0}
            max={100}
            label="Shoe size"
            onChange={(val) => onInputChange('show', val)}
        />

        <AppButton label="Submit" className="mt-5 mb-5 w-100" onClick={submit}/>
            
        </div>
    )
}
