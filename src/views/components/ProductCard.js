import React, {Component, useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './components.css';
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
        <Card className="col-xs-12 col-sm-6 col-md-3">
            <Card.Img variant="top" src={props.img} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text></Card.Text>
                <Container>
                    <Row>
                        <Col xs={6}>
                            <LoadingButton loadingText='Adding…' text='Add to Cart' />
                        </Col>
                        <Col xs={6}>
                            <Card.Link className="btn-secondary" href={props.link}>Learn more</Card.Link>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}

