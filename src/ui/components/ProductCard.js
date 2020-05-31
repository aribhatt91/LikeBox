import React, {Component, useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}
function LoadingButton(props) {
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() => {
        if (isLoading) {
        simulateNetworkRequest().then(() => {
            setLoading(false);
        });
        }
    }, [isLoading]);
    
    const handleClick = (e) => setLoading(true);
    
    return (
        <Button className="btn-primary" variant="primary" disabled={isLoading} onClick={!isLoading ? handleClick : null}>
            {isLoading ? props.loadingText : props.text}
        </Button>
    );
}
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
                        <span>Rs. {props.price}</span>
                        <span className="card_product_price_strike">{props.fullPrice ? "Rs. " + props.fullPrice : ""}</span>
                        <span className="card_product_discountPercentage">{props.discount ? props.discount : ""}</span>
                    </div>
                </div>
            </a>
        </div>
    );
}

