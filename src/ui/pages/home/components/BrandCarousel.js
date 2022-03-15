import React from 'react'
import AppImage from '../../../components/_generic/AppImage';
import Slider from "react-slick";
import BRANDS from '../../../../libs/constants/brands.json';

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
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
                        BRANDS.map((brand, index) => {
                            return (
                                <div className="col mb-3 p-0 mb-lg-0 m-0 pl-3 pr-3 brand-item" key={brand.brand}>
                                    <div className="d-flex w-100 h-100 align-center justify-content-center">
                                        <a href={brand.link} target="_blank" className="d-flex w-100 h-100 align-center justify-content-center">
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