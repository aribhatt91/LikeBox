import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


function CategoryTiles() {
    return (
        <div className="container mb-5 mt-5">
            <section className="likebox-home-section section-clothes mb-5">
                <h1>Clothes</h1>
                <div className="staggered-grid clothes-grid row ml-0 mr-0">
                    <div className="col-xs-12 col-md-6 grid-item position-relative zoom-in">
                        <div className="position-relative">
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-polo-shirts.jpg?alt=media&token=7259d185-0287-41cc-9f7c-cd3de37a8e9b"/>
                            <h3>Polo shirts</h3>
                            <Link className="position-absolute" to='/products/polo'/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 grid-item position-relative zoom-in">
                        <div className="position-relative">
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-hoodies-sweatshirts.jpg?alt=media&token=3609f086-ba52-4c6e-b043-2a556936f56e" />
                            <h3>Hoodies & Sweatshirts</h3>
                            <Link className="position-absolute" to='/products/hoodies-sweatshirts'/>
                        </div>
                    </div>

                    <div className="col-xs-12 col-md-4 grid-item position-relative zoom-in">
                        <div className="position-relative">
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-jeans.jpg?alt=media&token=0f3bf7a9-0b51-41dd-b2c5-ffb701eb8490" />
                            <h3>Jeans</h3>
                            <Link className="position-absolute" to='/products/jeans'/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-4 grid-item position-relative zoom-in">
                        <div className="position-relative">
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-shorts.jpg?alt=media&token=836117fe-c663-4aab-839b-cab5418611d7" />
                            <h3>Shorts</h3>
                            <Link className="position-absolute" to='/products/shorts'/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-4 grid-item position-relative zoom-in">
                        <div className="position-relative">
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-scarves.jpg?alt=media&token=fad0f031-ad94-4f2c-87e6-7ec14515e149" />
                            <h3>Scarves</h3>
                            <Link className="position-absolute" to='/products/scarves'/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 grid-item position-relative zoom-in">
                        <div className="position-relative">
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-shirts.jpg?alt=media&token=887e1a9d-7a6f-42d5-8430-29ffb4b8b481" />
                            <h3>Shirts</h3>
                            <Link className="position-absolute" to='/products/shirts'/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 grid-item position-relative zoom-in">
                        <div className="position-relative">
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-jackets-coats.jpg?alt=media&token=53a33b6b-783b-4b50-81f8-115099439b0e" />
                            <h3>Jackets & Coats</h3>
                            <Link className="position-absolute" to='/products/jackets-coats'/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="likebox-home-section section-clothes mb-5 zoom-in">
                <h1 className="text-right">Shoes</h1>
                <div className="staggered-grid clothes-grid row ml-0 mr-0">
                    <div className="col-xs-12 col-md-7 grid-item position-relative">
                        <div className="position-relative">
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-boots.jpg?alt=media&token=502263df-1fd4-4cd1-9f19-0fe8f3f7e983" />
                            <h3>Boots</h3>
                            <Link className="position-absolute" to='/products/boots'/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-5 grid-item position-relative zoom-in">
                        <div className="position-relative">
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-sandals-flip.jpg?alt=media&token=5665d7c0-bd9c-4343-a608-6b795efca3c6" />
                            <h3>Sandals & Flip-flops</h3>
                            <Link className="position-absolute" to='/products/sandals'/>
                        </div>
                    </div>

                    <div className="col-xs-12 col-md-5 grid-item position-relative zoom-in">
                        <div className="position-relative">
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-trainers.jpg?alt=media&token=ea2de3de-9a68-4b81-9ec4-66b588038d43" />
                            <h3>Trainers</h3>
                            <Link className="position-absolute" to='/products/trainer'/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-7 grid-item position-relative zoom-in">
                        <div className="position-relative">
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-slippers.jpg?alt=media&token=88508106-8e68-4b1c-88f6-b15906781f03" />
                            <h3>Slippers</h3>
                            <Link className="position-absolute" to='/products/slippers'/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-12 grid-item position-relative zoom-in">
                        <div className="position-relative">
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-shoes.jpg?alt=media&token=41f2d077-66de-4d59-80eb-e1f3100f2704" />
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
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-belts.jpg?alt=media&token=99933eb9-ab43-446c-acec-e7dba57da6fb" />
                            <h3>Belts</h3>
                            <Link className="position-absolute" to='/products/belts'/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-5 grid-item position-relative">
                        <div className="position-relative">
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-caps-hats.jpg?alt=media&token=2e7dea52-fb8a-48b8-b2d3-20a8d592adfc" />
                            <h3>Caps & hats</h3>
                            <Link className="position-absolute" to='/products/caps-hats'/>
                        </div>
                    </div>

                    <div className="col-xs-12 col-md-5 grid-item position-relative">
                        <div className="position-relative">
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-bags.jpg?alt=media&token=1ca1a984-99bb-4d26-ac1a-b7ccf0262335" />
                            <h3>Bags</h3>
                            <Link className="position-absolute" to='/products/bags'/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-7 grid-item position-relative">
                        <div className="position-relative">
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-gloves.jpg?alt=media&token=5ad73105-fe37-4caf-ae5d-0546ea446411" />
                            <h3>Gloves</h3>
                            <Link className="position-absolute" to='/products/gloves'/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-12 grid-item position-relative">
                        <div className="position-relative">
                            <LazyLoadImage effect="opacity" className="grid-img" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/mens-accessories.jpg?alt=media&token=a0f0d241-0666-43af-9e81-468b8389b654" />
                            <h3>All accessories</h3>
                            <Link className="position-absolute" to='/products/accessories'/>
                        </div>
                    </div>
                </div>
            </section>
        </div>)
}

export default CategoryTiles;