import React from 'react'
import { useState, useEffect, useRef } from 'react';
import PageMessage from './PageMessage';
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
        <div className="form-group animated-text-input d-inline-block">
            <div className="d-flex justify-content-start">
                <div className="d-inline-flex pr-1">
                    <label htmlFor={'day'}>
                        <input ref={dd} defaultValue={initialValues['day']} onKeyUp={appInputChange} disabled={disabled} onChange={handleChange('day')} name="day" type="number" placeholder="DD" min={1} max={31} className="form-control date-input-field" />
                    </label>
                </div>
                <div className="d-inline-flex pr-1">
                    <label htmlFor={'day'}>
                        <input ref={mm} defaultValue={initialValues['month']} onKeyUp={appInputChange} disabled={disabled} onChange={handleChange('month')} name="month" type="number" placeholder="MM" min={1} max={12} className="form-control date-input-field" />
                    </label>
                </div>
                <div className="d-inline-flex pr-1">
                    <label htmlFor={'day'}>
                        <input ref={yy} defaultValue={initialValues['year']} onKeyUp={appInputChange} disabled={disabled} onChange={handleChange('year')} name="year" type="number" placeholder="YYYY" min={1900} max={(new Date()).getFullYear()} className="form-control date-input-field"/>
                    </label>
                </div>
            </div>
            {errors['day'] && <PageMessage type="error" size="small" text={errors['day']} />}
            {errors['month'] && <PageMessage type="error" size="small" text={errors['month']} />}
            {errors['year'] && <PageMessage type="error" size="small" text={errors['year']} />}
        </div>
    )
}
