import React from 'react'
import BagIcon from './BagIcon'
import StarIcon from './StarIcon';
import CircledCheckIcon from './CircledCheckIcon';
import HeartIcon from './HeartIcon';
import TrashIcon from './TrashIcon';

export default function TestIcons() {
    return (
        <div>
            <div className="d-inline-flex">
                <BagIcon />
            </div>
            <div className="d-inline-flex">
                <StarIcon />
            </div>
            <div className="d-inline-flex">
                <CircledCheckIcon />
            </div>
            <div className="d-inline-flex">
                <HeartIcon />
            </div>
            <div className="d-inline-flex">
                <TrashIcon />
            </div>
        </div>
    )
}
