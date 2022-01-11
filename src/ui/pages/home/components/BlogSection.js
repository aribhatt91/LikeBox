import React, { useState, useEffect} from 'react'
import Slider from 'react-slick';
//https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@the_likebox
import axios from 'axios';
import AppLink from './../../../components/generic/AppLink';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const settings = {
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };

function BlogCard({title, thumbnail, date, link}){
    return (
        <div className="app-card m-3">
            <AppLink className="app-card-body blog-card d-flex flex-column" href={link} target="_blank">
                <div className="app-card-img d-flex">
                    <LazyLoadImage className="w-100" src={thumbnail} effect="blur" />
                </div>
                <div className="app-card-footer p-3">
                    <h4 className="font-weight-bold">
                        {title}
                    </h4>
                    <p className="font-weight-light">
                        {
                            (new Date(date)).toDateString()
                        }
                    </p>
                </div>
            </AppLink>
        </div>
    )
}
export default function BlogSection() {
    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{
        (async () => {
            try {
                let res = await axios({
                    method: 'get',
                    url: 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@the_likebox'
                });
                setBlogs(res.data.items || []);
            }catch(err){

            }finally {

            }
        })()
    }, [])

    return (
        <section className={blogs.length > 0 ? "d-flex flex-column w-100 container" : "d-none"}>
            <h1 className="like-box-header-1 font-weight-bold text-center w-100">LikeBLOGS</h1>
            <div className="likeblogs pt-4 pb-4 w-100">
                <div className="mt-4 mb-4 w-100">
                    {blogs.length > 0 && <Slider {...settings}>
                        {
                            blogs.map((item) => {
                                return <BlogCard key={item.pubDate} title={item.title} link={item.link} thumbnail={item.thumbnail} date={item.pubDate} />
                            })
                        }
                    </Slider>}
                </div>
            </div>
        </section>
    )
}
