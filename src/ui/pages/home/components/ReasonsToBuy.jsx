import React from 'react';
import AppImage from '../../../components/_generic/AppImage';

function ReasonsToBuy() {
  return (
        <div className="container pt-5 pb-5 reasons">
            <div className='text-center'>
                <h3 className='font-weight-bold text-center w-100 mb-4'>TRADITIONAL CLOTHES SHOPPING MADE EASY</h3>
            </div>
            <div className="d-flex col-12 pl-2 pr-2 flex-column flex-lg-row justify-content-lg-between">
                <div className="col-12 mb-5 mb-lg-0 col-lg-3 d-flex flex-column align-items-center text-center">
                    <div className="reasons-icon mb-3 mt-3">
                        <AppImage src={'https://firebasestorage.googleapis.com/v0/b/the-likebox.appspot.com/o/Image%2011.png?alt=media&token=48e14c43-55e5-41b3-b09d-bbfa0fd74848'} />
                    </div>
                    <div className="reasons-text">
                        <h6 className="reasons-text-header font-weight-bold">HASSLE FREE SHOPPING</h6>
                        <p className="reasons-text-subheader mb-0">Shop smarter, not harder with our effortless online personal shopper that takes the work out of clothing shopping</p>
                    </div>
                </div>
                <div className="col-12 mb-5 mb-lg-0 col-lg-3 d-flex flex-column align-items-center text-center">
                    <div className="reasons-icon mb-3 mt-3">
                        <AppImage src={'https://firebasestorage.googleapis.com/v0/b/the-likebox.appspot.com/o/Image%204.png?alt=media&token=4248ef50-9a7e-4eeb-a20b-4db7b78f7161'} />
                    </div>
                    <div className="reasons-text">
                        <h6 className="reasons-text-header font-weight-bold">WIDE SELECTION OF OPTIONS</h6>
                        <p className="reasons-text-subheader mb-0">Effortlessly shop a diverse range of clothing options</p>
                    </div>
                </div>
                <div className="col-12 col-lg-3 d-flex flex-column align-items-center text-center">
                    <div className="reasons-icon mb-3 mt-3">
                        <AppImage src={'https://firebasestorage.googleapis.com/v0/b/the-likebox.appspot.com/o/Image%2012.png?alt=media&token=331a284e-b3d2-4724-8422-46e354c74d2e'} />
                    </div>
                    <div className="reasons-text">
                        <h6 className="reasons-text-header font-weight-bold">MUST-HAVE LOOKS</h6>
                        <p className="reasons-text-subheader mb-0">Stay on trend with our constantly updated collection of latest fashion</p>
                    </div>
                </div>
                <div className="col-12 col-lg-3 d-flex flex-column align-items-center text-center">
                    <div className="reasons-icon mb-3 mt-3">
                        <AppImage src={'https://firebasestorage.googleapis.com/v0/b/the-likebox.appspot.com/o/Image%2010.png?alt=media&token=03ca05c1-5e7e-4a08-acd3-71986ac97100'} />
                    </div>
                    <div className="reasons-text">
                        <h6 className="reasons-text-header font-weight-bold">THE PERFECT FIT</h6>
                        <p className="reasons-text-subheader mb-0">Find clothes that fit your body with our wide range of sizes</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ReasonsToBuy