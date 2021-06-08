import React from 'react';
import { Link } from 'react-router-dom';
import Disclaimer from './Disclaimer';
import TnC from './TnC';

function Footer(){
    return (
        <footer className="global-footer">
            <div className='container mt-4 mb-4'>
                <div className="row m-0">
                    <div className="col-12 col-md-4">
                        <h5 className="text-uppercase font-weight-normal mb-3">About LikeBox</h5>
                        <Link to="/about#history" className="footer-link">LikeBox hstory</Link>
                        <Link to="/about#future" className="footer-link">LikeBox future</Link>
                        <Link to="/careers" className="footer-link">Careers</Link>
                        <Link to="/about#investors" className="footer-link">Investors</Link>
                        <Link to="/about#sustainability" className="footer-link">Sustainability</Link>
                    </div>
                    <div className="col-12 col-md-4">
                        <h5 className="text-uppercase font-weight-normal mb-3">Help & Information</h5>
                        <Link to="/help#shipping" className="footer-link">Shipping and Delivery</Link>
                        <Link to="/help#returns" className="footer-link">Returns</Link>
                        <Link to="/help#faqs" className="footer-link">Frequently asked questions</Link>
                        <Link to="/help#feedback" className="footer-link">Feedback</Link>
                        <TnC className="footer-link" />
                        <Disclaimer className="footer-link" />
                    </div>
                    <div className="col-12 col-md-4">
                        <h5 className="text-uppercase font-weight-normal mb-3">Contact</h5>
                        <p className="footer-text">Our door is always open! If you have any questions, suggestions or complaints send us an email at <a href="mailto:paul@likebox.co.uk">paul@likebox.co.uk</a></p>
                    </div>
                </div>
            </div>
            
        </footer>
    )
}

export default Footer;