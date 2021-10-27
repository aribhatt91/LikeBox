import React from 'react';
import Page from '../Page';
function About() {

    return (
    <Page pageName="about us">
        <div className={"about-section mt-5 mb-5 container"}>
            <h1 className="text-center mb-5 text-uppercase">The LikeBox Story</h1>
            <div className="col-xs-12">
                <p className="text-uppercase h3">
                WE CREATED LIKEBOX BECAUSE WE BELIEVE SHOPPING FOR CLOTHES ONLINE SHOULDN'T BE SO DIFFICULT.
                </p>
                <p className="text-uppercase h3">YOU SHOULDN'T HAVE TO BROWSE THROUGH THOUSANDS OF ITEMS TO FIND THE PERFECT ONE.</p>
                <p className="text-uppercase h3">YOU SHOULDN'T HAVE TO WASTE TIME RETURNING CLOTHES BECAUSE YOU DIDN'T KNOW WHAT SIZE TO ORDER.</p>
                <p className="text-uppercase h3">YOU SHOULDN'T HAVE TO SHOP FROM THE SAME BRAND EVERYTIME.</p>
                <p className="text-uppercase h3">SO WE CREATED A SOLUTION. LIKEBOX IS YOUR ONLINE PERSONAL SHOPPER.</p>
                <p className="text-uppercase h3">BY PROVIDING US WITH YOUR STYLING PREFERENCES AND SIZING INFORMATION WE WILL ENSURE YOU'RE SHOWN CLOTHES THAT YOU WILL LOVE, NOT CLOTHES THAT MAKE US THE MOST MONEY!</p>
            </div>
        </div>
    </Page>);
  
}

export default About;
