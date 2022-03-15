import React from 'react'
import { useState, useEffect, useRef } from 'react';
import AppMessage from '../AppMessage';
import { useFormikContext } from 'formik';

export default function AppDateInput({disabled, className, ...rest}) {
    const {setFieldTouched, handleChange, errors, touched, values, initialValues} = useFormikContext();
    const dd = useRef(null),
    mm = useRef(null),
    yy = useRef(null);
    const appInputChange = (e) => {
        let name = e.target.name, str = e.target.value + "";
        if(str.trim().length >= 2){
            if(name === 'day'){
                var val = Number(dd.current.value || 0);
                if(isNaN(val) || val < 1 || val > 31){
                    //dd.current.val = 1;
                }else {
                    mm.current.focus();
                }
            }else if(name === 'month'){
                var val = Number(mm.current.value || 0);
                if(isNaN(val) || val < 1 || val > 12){
                    //dd.current.val = 1;
                }else {
                    yy.current.focus();
                }
            }else if(name === 'year'){
                var val = Number(yy.current.value || 0);
                if(isNaN(val) || val < 1900 || val > (new Date()).getFullYear()){
                    //dd.current.val = "";
                }else if(str.trim().length >= 4){
                    dd.current.focus();
                    //handleChange[name]();
                }
            }
        }
        
    }
    return (
        <div className="form-group app-text-input d-inline-block">
            <div className="d-flex justify-content-start">
                <div className="d-inline-flex pr-1">
                    <label htmlFor={'day'}>
                        <input 
                        ref={dd} 
                        defaultValue={initialValues['day']} 
                        onKeyUp={appInputChange} 
                        disabled={disabled} 
                        onChange={handleChange('day')} 
                        onBlur={()=>setFieldTouched('day')}
                        name="day" 
                        type="number" 
                        placeholder="DD" 
                        min={1} 
                        max={31} 
                        className="form-control date-input-field" />
                    </label>
                </div>
                <div className="d-inline-flex pr-1">
                    <label htmlFor={'day'}>
                        <input 
                        ref={mm} 
                        defaultValue={initialValues['month']} 
                        onKeyUp={appInputChange} 
                        disabled={disabled} 
                        onChange={handleChange('month')} 
                        onBlur={()=>setFieldTouched('month')}
                        name="month" 
                        type="number" 
                        placeholder="MM" 
                        min={1} 
                        max={12} 
                        className="form-control date-input-field" />
                    </label>
                </div>
                <div className="d-inline-flex pr-1">
                    <label htmlFor={'day'}>
                        <input 
                        ref={yy} 
                        defaultValue={initialValues['year']} 
                        onKeyUp={appInputChange} 
                        disabled={disabled} 
                        onChange={handleChange('year')} 
                        onBlur={()=>setFieldTouched('year')}
                        name="year" 
                        type="number" 
                        placeholder="YYYY" 
                        min={1900} 
                        max={(new Date()).getFullYear()} 
                        className="form-control date-input-field"/>
                    </label>
                </div>
            </div>
            {errors['day'] && touched['day'] && <AppMessage type="error" size="sm" text={errors['day']} />}
            {errors['month'] && touched['month'] && <AppMessage type="error" size="sm" text={errors['month']} />}
            {errors['year'] && touched['year'] && <AppMessage type="error" size="sm" text={errors['year']} />}
        </div>
    )
}
