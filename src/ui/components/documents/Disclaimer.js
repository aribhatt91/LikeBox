import React, { useState } from 'react'
import AppModal from '../generic/AppModal';

export default function Disclaimer({className}) {
    const [show, setShow] = useState(false);
    
    return (

        <React.Fragment>
            <a href="#disclaimer" onClick={() => setShow(true)} className={className? className : ""}>
                Disclaimer
            </a>
            {show && <AppModal className="w-100 h100" id="disclaimer" onClose={() => setTimeout(()=>setShow(false), 500)}>
                <article className="crisp-article">
                    <div className="container">
                        <h1>DISCLAIMER</h1>
                        <p><strong>Last updated May 13, 2021</strong></p>

                        <div className="article-section">
                            <h3>WEBSITE DISCLAIMER</h3>
                            <p>The information provided by The Likebox Limited (“we,” “us” or “our”) on <a href="https://www.likebox.co.uk">http://www.likebox.co.uk</a> (the “Site”) and our mobile application is for general informational purposes only. All information on the Site and our mobile application is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the Site or our mobile application. UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR OUR MOBILE APPLICATION OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE AND OUR MOBILE APPLICATION. YOUR USE OF THE SITE AND OUR MOBILE APPLICATION AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE AND OUR MOBILE APPLICATION IS SOLELY AT YOUR OWN RISK.</p>

                            
                        </div>
                        <div className="article-section">
                            <h3>EXTERNAL LINKS DISCLAIMER</h3>

                            <p>The Site and our mobile application may contain (or you may be sent through the Site or our mobile application) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN ANY BANNER OR OTHER ADVERTISING. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.</p>
                        </div>

                        <div className="article-section">
                            <h3>AFFILIATES DISCLAIMER</h3>

                            <p>The Site and our mobile application may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links. Our affiliates include the following:</p>

                            <ul>
                                <li>Awin</li>
                                <li>CJ Affiliates</li>
                            </ul>
                        </div>

                        <div className="article-section">
                            <h3>TESTIMONIALS DISCLAIMER</h3>

                            <p>The Site may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all users will have the same experiences. YOUR INDIVIDUAL RESULTS MAY VARY.</p>

                            <p>The testimonials on the Site are submitted in various forms such as text, audio and/or video, and are reviewed by us before being posted. They appear on the Site verbatim as given by the users, except for the correction of grammar or typing errors. Some testimonials may have been shortened for the sake of brevity where the full testimonial contained extraneous information not relevant to the general public.</p>

                            <p>The views and opinions contained in the testimonials belong solely to the individual user and do not reflect our views and opinions. We are not affiliated with users who provide testimonials, and users are not paid or otherwise compensated for their testimonials.</p>
                            
                        </div>
                    </div>
                </article>
    
            </AppModal>}
        </React.Fragment>
   
    )
}
