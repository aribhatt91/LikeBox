import React, { useState, useEffect } from 'react'
import AppImage from '../../../components/generic/AppImage';
import Slider from "react-slick";
import BRANDS from '../../../../service/constants/brands.json';

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
  };

export default function BrandCarousel() {
    
    return (
        <div className="affiliate-brands pt-4 pb-4 border-top w-100">
            <div className="mt-4 mb-4">

                <Slider {...settings}>
                    {
                        BRANDS.map(brand => {
                            return (
                                <div className="col mb-3 p-0 mb-lg-0 m-0 pl-3 pr-3 brand-item">
                                    <div className="d-flex w-100 h-100 align-center justify-content-center">
                                        <a href={brand.link} target="_blank" className="w-100">
                                            <AppImage className="w-100" alt={brand.brand} src={brand.logo} />
                                        </a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}
/* export default function BrandCarousel() {
    
    return (
        <div className="affiliate-brands pt-4 pb-4 border-top">
            <div className="container mt-4 mb-4">
                <ul className="d-flex w-100 list-unstyled p-0 m-0 justify-content-center justify-content-md-between flex-wrap">
                    <li className="col-6 mb-3 col-sm-4 col-md-2 p-0 mb-lg-0 m-0 pl-3 pr-3">
                        <div className="d-flex w-100 h-100 align-center justify-content-center">
                            <a href="https://www.asket.com/" target="_blank" className="w-100">
                                <AppImage className="w-100" alt="Asket" src="https://images.opumo.com/storage/brand/opumo-asket-brand-page-logo.png" />
                            </a>
                        </div>
                    </li>

                    <li className="col-6 mb-3 col-sm-4 col-md-2 p-0 mb-lg-0 m-0 pl-3 pr-3">
                        <div className="d-flex w-100 h-100 align-center justify-content-center">
                            <a href="https://www.bellfieldclothing.com/" target="_blank" className="w-100">
                                <AppImage className="w-100" alt="Bellfield Clothing" src="//cdn.shopify.com/s/files/1/0009/5695/6732/files/Bellfield-Logo-Updated_410x.png?v=1576251689" />
                            </a>
                        </div>
                    </li>
                    <li className="col-6 mb-3 col-sm-4 col-md-2 p-0 mb-lg-0 m-0 pl-3 pr-3">
                        <div className="d-flex w-100 h-100 align-center justify-content-center">
                            <a href="" target="_blank" className="w-100" href="https://www.craghoppers.com/" title="Craghoppers">
                                <AppImage className="w-100" alt="Craghoppers" src="https://static.craghoppers.com/version1620808872/frontend/Regatta/craghoppers-desktop/en_GB/images/logo.svg" />
                            </a>
                        </div>
                    </li>
                    <li className="col-6 mb-3 col-sm-4 col-md-2 p-0 mb-lg-0 m-0 pl-3 pr-3">
                        <div className="d-flex w-100 h-100 align-center justify-content-center">
                            <a href="https://www.farah.co.uk/" target="_blank" className="w-100">
                                <AppImage className="w-100" alt="Farah" src="https://s3-eu-west-1.amazonaws.com/globale-prod/Images/FarahUK/Far-logo-400x400.png"/>
                            </a>
                        </div>
                    </li>
                    <li className="col-6 mb-3 col-sm-4 col-md-2 p-0 mb-lg-0 m-0 pl-3 pr-3">
                        <div className="d-flex w-100 h-100 align-center justify-content-center">
                            <a href="" target="_blank" className="w-100" href="https://www.originalpenguin.co.uk/">
                                <AppImage className="w-100" alt="Original Penguin" src="https://cdn.shopify.com/s/files/1/0056/1263/4215/files/op-logo_db2e00af-fd39-4796-b857-63be2b2e712f_1080x.jpg?v=1568018051" />
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

 */