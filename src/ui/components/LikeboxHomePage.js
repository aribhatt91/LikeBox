import React from 'react';
import { Link } from 'react-router-dom';
import mensshirts from '../../assets/img/banners/mens-shirts.jpg';
import mensgloves from '../../assets/img/banners/mens-gloves.jpg';
import poloshirts from '../../assets/img/banners/mens-polo-shirts.jpg';
import menshoodiessweatshirts from '../../assets/img/banners/mens-hoodies-sweatshirts.jpg';
import mensjacketscoats from '../../assets/img/banners/mens-jackets-coats.jpg';
import mensjeans from '../../assets/img/banners/mens-jeans.jpg';
import mensscarves from '../../assets/img/banners/mens-scarves.jpg';
import mensshorts from '../../assets/img/banners/mens-shorts.jpg';
import mensboots from '../../assets/img/banners/mens-boots.jpg';
import mensshoes from '../../assets/img/banners/mens-shoes.jpg';
import menssandals from '../../assets/img/banners/mens-sandals-flip.jpg';
import mensslippers from '../../assets/img/banners/mens-slippers.jpg';
import menstrainers from '../../assets/img/banners/mens-trainers.jpg';

import mensbags from '../../assets/img/banners/mens-bags.jpg';
import accessories from '../../assets/img/banners/mens-accessories.jpg';
import mensbelts from '../../assets/img/banners/mens-belts.jpg';
import menscaps from '../../assets/img/banners/mens-caps-hats.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Page from '../pages/Page';
import BrandCarousel from './BrandCarousel';
function LikeBoxHomePage({slideOut, slideIn}) {
    return (<Page>
    <div className="container mb-5 mt-5">
        <section className="likebox-home-section section-clothes mb-5">
            <h1>Clothes</h1>
            <div className="staggered-grid clothes-grid row ml-0 mr-0">
                <div className="col-xs-12 col-md-6 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={poloshirts}/>
                        <h3>Polo shirts</h3>
                        <Link className="position-absolute" to='/products/polo'/>
                    </div>
                </div>
                <div className="col-xs-12 col-md-6 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={menshoodiessweatshirts} />
                        <h3>Hoodies & Sweatshirts</h3>
                        <Link className="position-absolute" to='/products/hoodies-sweatshirts'/>
                    </div>
                </div>

                <div className="col-xs-12 col-md-4 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={mensjeans} />
                        <h3>Jeans</h3>
                        <Link className="position-absolute" to='/products/jeans'/>
                    </div>
                </div>
                <div className="col-xs-12 col-md-4 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={mensshorts} />
                        <h3>Shorts</h3>
                        <Link className="position-absolute" to='/products/shorts'/>
                    </div>
                </div>
                <div className="col-xs-12 col-md-4 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={mensscarves} />
                        <h3>Scarves</h3>
                        <Link className="position-absolute" to='/products/scarves'/>
                    </div>
                </div>
                <div className="col-xs-12 col-md-6 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={mensshirts} />
                        <h3>Shirts</h3>
                        <Link className="position-absolute" to='/products/shirts'/>
                    </div>
                </div>
                <div className="col-xs-12 col-md-6 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={mensjacketscoats} />
                        <h3>Jackets & Coats</h3>
                        <Link className="position-absolute" to='/products/jackets-coats'/>
                    </div>
                </div>
            </div>
        </section>
        <section className="likebox-home-section section-clothes mb-5">
            <h1 className="text-right">Shoes</h1>
            <div className="staggered-grid clothes-grid row ml-0 mr-0">
                <div className="col-xs-12 col-md-7 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={mensboots} />
                        <h3>Boots</h3>
                        <Link className="position-absolute" to='/products/boots'/>
                    </div>
                </div>
                <div className="col-xs-12 col-md-5 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={menssandals} />
                        <h3>Sandals & Flip-flops</h3>
                        <Link className="position-absolute" to='/products/sandals'/>
                    </div>
                </div>

                <div className="col-xs-12 col-md-5 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={menstrainers} />
                        <h3>Trainers</h3>
                        <Link className="position-absolute" to='/products/trainer'/>
                    </div>
                </div>
                <div className="col-xs-12 col-md-7 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={mensslippers} />
                        <h3>Slippers</h3>
                        <Link className="position-absolute" to='/products/slippers'/>
                    </div>
                </div>
                <div className="col-xs-12 col-md-12 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={mensshoes} />
                        <h3>All shoes</h3>
                        <Link className="position-absolute" to='/products/shoes'/>
                    </div>
                </div>
            </div>
        </section>
        <section className="likebox-home-section section-clothes">
            <h1>Accessories</h1>
            <div className="staggered-grid clothes-grid row ml-0 mr-0">
                <div className="col-xs-12 col-md-7 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={mensbelts} />
                        <h3>Belts</h3>
                        <Link className="position-absolute" to='/products/belts'/>
                    </div>
                </div>
                <div className="col-xs-12 col-md-5 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={menscaps} />
                        <h3>Caps & hats</h3>
                        <Link className="position-absolute" to='/products/caps-hats'/>
                    </div>
                </div>

                <div className="col-xs-12 col-md-5 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={mensbags} />
                        <h3>Bags</h3>
                        <Link className="position-absolute" to='/products/bags'/>
                    </div>
                </div>
                <div className="col-xs-12 col-md-7 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={mensgloves} />
                        <h3>Gloves</h3>
                        <Link className="position-absolute" to='/products/gloves'/>
                    </div>
                </div>
                <div className="col-xs-12 col-md-12 grid-item position-relative">
                    <div className="position-relative">
                        <LazyLoadImage effect="opacity" className="grid-img" src={accessories} />
                        <h3>All accessories</h3>
                        <Link className="position-absolute" to='/products/accessories'/>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <BrandCarousel />
    </Page>)
}

export default LikeBoxHomePage;