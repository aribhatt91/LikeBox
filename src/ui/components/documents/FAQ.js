import React, { useState } from 'react'
import AppModal from '../generic/AppModal';
import FAQS from '../../../service/constants/faqs';
export default function FAQ({className}) {
    const [show, setShow] = useState(false);
    
    return (

        <React.Fragment>
            <a href="#faq" onClick={() => setShow(true)} className={className? className : ""}>
                FAQs
            </a>
            {show && <AppModal className="w-100 h100" id="faq" onClose={() => setTimeout(()=>setShow(false), 500)}>
                <article className="crisp-article">
                    <div className="container">
                        <h1>DISCLAIMER</h1>
                        <p><strong>Last updated May 13, 2021</strong></p>
                        {
                            FAQS.map((item, index) => (
                                <div className="article-section" key={index}>
                                    <h3>{item.q}</h3>
                                    {
                                        item.a
                                    }
                                </div>
                            ))
                        }
                    </div>
                </article>
    
            </AppModal>}
        </React.Fragment>
   
    )
}
