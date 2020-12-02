import React, {Component, useState, useEffect} from 'react';
export const ProductCard = (props) => {
    return (
        <div className="col-xs-12 col-sm-6 col-md-3 p-8 float-left">
            <a className="card_wrapper" href={props.link}>
                <div className="card_img_wrapper">
                    <img className="card_img" src={props.img} alt={props.title}></img>
                </div>
                <div className="card_text_wrapper">
                    <h3 className="card_product_brand">{props.brand}</h3>
                    <h4 className="card_product_name">{props.title}</h4>
                    <div className="card_product_price">
                        <span>&#x20B9;{props.price}</span>
                        <span className="card_product_price_strike">{props.fullPrice ? "&#x20B9; " + props.fullPrice : ""}</span>
                        <span className="card_product_discountPercentage">{props.discount ? props.discount : ""}</span>
                    </div>
                </div>
            </a>
        </div>
    );
}

