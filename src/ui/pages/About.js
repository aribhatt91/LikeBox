import React from 'react';
import Page from './Page';
function About(props) {

    return (
    <Page className="page about-section" pageName="about">
        <div className="w-100 h-100 d-flex align-center">
                <div className="container d-flex flex-column align-center justify-content-center">
                    <h1 className="font-weight-bold text-uppercase col-lg-5 mt-5">
                        Coming soon.
                    </h1>
                    <h3 className="text-uppercase col-lg-5 mt-4 mb-5">
                        Stay tuned...
                    </h3>
                </div>
            </div>
    </Page>);
  
}

export default About;
