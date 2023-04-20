import React from 'react'
import AppImage from '../../../components/_generic/AppImage';

const features = [
    {
        title: "PERSONAL SHOPPER",
        icon: "https://firebasestorage.googleapis.com/v0/b/the-likebox.appspot.com/o/Image%205.png?alt=media&token=47bb2fbb-4669-4b30-b76c-375f21229fe1",
        subtext: "Likebox makes clothes shopping hassle-free, with personalized recommendations and a wide selection of options. From special requests and tailored styles to sale alerts and budget-friendly suggestions, we help you find the clothes you love at the right price."
    },
    {
        title: "LARGE SELECTION",
        icon: "https://firebasestorage.googleapis.com/v0/b/the-likebox.appspot.com/o/Image%204.png?alt=media&token=4248ef50-9a7e-4eeb-a20b-4db7b78f7161",
        subtext: "Our shop boasts a diverse range of clothes and brands for all styles and budgets. Find everything from everyday essentials to the latest fashion trends with a huge variety of options."
    },
    {
        title: "HIGH QUALITY",
        icon: "https://firebasestorage.googleapis.com/v0/b/the-likebox.appspot.com/o/Image%207.png?alt=media&token=e89fd4dc-338e-4750-96d0-649f820f5685",
        subtext: "Discover top-notch quality clothing at Likebox. No need to worry about authenticity, our collection features premium products made with durable, long-lasting materials. Elevate your wardrobe with garments that stand the test of time."
    }
]

function Features() {
  return (
    <div className="feature__container container pt-5 pb-5">
            <div className='text-center'>
                <h3 className='font-weight-bold text-center w-100 mb-5'>UNLEASH YOUR STYLE WITH LIKEBOX, < br className='d-none d-md-block'/>THE WORLD'S FIRST ONLINE PERSONAL SHOPPER</h3>
            </div>
            <div className="d-flex row pl-2 pr-2 flex-column flex-lg-row justify-content-center">
                {
                    features.map((feature, index) => {
                    return (<div key={index} className={`feature row mt-4 mb-4 d-flex flex-column flex-md-nowrap ${index%2 ? 'flex-md-row-reverse' : 'flex-md-row'} align-items-center text-center`}>
                    <div className={`d-flex flex-column col-lg-4 col-md-5 justify-content-center align-items-center ${index%2 ? 'align-items-md-end' : 'align-items-md-start'}`}>
                        <div className=''><h6 className='font-weight-bold'>{feature.title}</h6>
                        <AppImage className="feature__icon m-4" src={feature.icon} />
                        </div>
                        
                    </div>
                    <div className="reasons-text text-center text-md-left">
                        <p className="mb-0 font-weight-normal">{feature.subtext}</p>
                    </div>
                </div>)})
                }
            </div>
        </div>
  )
}

export default Features