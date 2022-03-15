import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.component.css';

const Star = ({onClick, rated, value, hover, onMouseEnter, onMouseLeave}) => {

    return (<span className={"star-rating__star p-1" + (rated || hover ? " star-rating__star--selected": "")} onClick={() => onClick(value)} onMouseEnter={() => onMouseEnter(value)} onMouseLeave={() => onMouseLeave(value)}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}}>
                    <g>
                        <g>
                            <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 
                                255.898,401.21 416.035,502.431 369.263,318.842 		"/>
                        </g>
                    </g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                </svg>
            </span>)
}
const StarRating = ({initialValue=0, disabled=false, onSelect}) => {
    const [rating, setRating] = useState(initialValue);
    const [hover, setHover] = useState(0);

    const select = (val) => {
        if(disabled){return;}
        if(rating === val){
            val = val-1;
        }
        setRating(val);
        //send back data
        if(typeof onSelect === 'function'){
            onSelect(val);
        }
    }
    
    return (
        <div className="d-inline-flex star-rating" onMouseLeave={() => setHover(0)}>
            {
                (new Array(5)).fill(0).map((item,index) => <Star 
                onClick={select} 
                rated={rating >= (index+1)} 
                value={index+1}
                hover={hover >= index+1}
                onMouseEnter={(val) => !disabled && setHover(val)}
                onMouseLeave={(val) => !disabled && setHover(val-1)}
                key={index}
                />)
            }
        </div>
    );
}

StarRating.propTypes = {
    initialValue: PropTypes.number,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool
}

export default StarRating;
