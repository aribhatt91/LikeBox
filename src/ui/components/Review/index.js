import React from 'react'
import PropTypes from 'prop-types';
import StarRating from '../_generic/StarRating';
import './style.component.css';

export default function Review({name, date, rating, text}) {
  return (
    <div className='review'>
        <div className="review__head">
            <div className="review__name">
                {name}
            </div>
            <div className="review__stars">
                <StarRating initialValue={Number(rating)} disabled={true} />
            </div>
            <div className="review_date">
                {date}
            </div>
        </div>
        <div className="review__body">
            <p>
                {text}
            </p>
        </div>
    </div>
  )
}


Review.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    text: PropTypes.string
};