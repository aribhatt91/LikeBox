import React from 'react';
import './style.component.css';

export default function ErrorModule({error}) {
    return (
        <div className="error-module w-100 h-100 d-flex align-center pt-5 pb-5">
            <div className="container d-flex flex-column align-center justify-content-center">
                <h1 className="font-weight-bold text-uppercase col-lg-5">
                    OOPS!
                </h1>
                <h3 className="text-uppercase mt-4 col-lg-5">
                    {
                        error
                    }
                </h3>
            </div>
        </div>
    )
}