import React from 'react';
import { Link } from 'react-router-dom';
import Disclaimer from '../_documents/Disclaimer';
import FAQ from '../_documents/FAQ';
import TnC from '../_documents/TnC';
import PrivacyPolicy from '../_documents/PrivacyPolicy';
import AppLink from '../_generic/AppLink';
import FacebookIcon from '../_svg-components/FacebookIcon';
import InstaIcon from '../_svg-components/InstaIcon';
import TwitterIcon from '../_svg-components/TwitterIcon';
import './style.component.css';

function Footer(){
    return (
        <footer className="global-footer">
            <div className='container mt-4 mb-4'>
                <div className="row m-0">
                    <div className="col-12 col-md-4">
                        <h5 className="text-uppercase font-weight-normal mb-3">About LikeBox</h5>
                        <AppLink className="footer-link" href="https://medium.com/@the_likebox" target="_blank">Blog</AppLink>
                        <Link to="/about#history" className="footer-link">LikeBox history</Link>
                        <Link to="/about#future" className="footer-link">LikeBox future</Link>
                        <Link to="/about#investors" className="footer-link">Investors</Link>
                        <Link to="/about#sustainability" className="footer-link">Sustainability</Link>
                        
                    </div>
                    <div className="col-12 col-md-4">
                        <h5 className="text-uppercase font-weight-normal mb-3">Help & Information</h5>
                        <PrivacyPolicy className="footer-link" />
                        <TnC className="footer-link" />
                        <Disclaimer className="footer-link" />
                        <FAQ className="footer-link" />
                    </div>
                    <div className="col-12 col-md-4">
                        <h5 className="text-uppercase font-weight-normal mb-3">Contact</h5>
                        <p className="footer-text">Our door is always open! If you have any questions, suggestions or complaints send us an email at <a href="mailto:support@likebox.co.uk">support@likebox.co.uk</a></p>
                        <div className="d-flex mt-2 media-links">
                            <AppLink className="text-decoration-none d-inline-flex mr-3" href="https://facebook.com" target="_blank">
                                <FacebookIcon size="32" />
                            </AppLink>
                            <AppLink className="text-decoration-none d-inline-flex mr-3" href="https://instagram.com/the_likebox" target="_blank">
                                <InstaIcon size="32" />
                            </AppLink>
                            <AppLink className="text-decoration-none d-inline-flex" href="https://twitter.com/The_LikeBox" target="_blank">
                                <TwitterIcon size="32" />
                            </AppLink>
                        </div>
                    </div>
                </div>
            </div>
            
        </footer>
    )
}

export default Footer;