import React, {Component} from 'react';
import Page from './Page';
import Hero from '../components/Hero';
import LikeBox from '../components/LikeBox';

function Home() {
    return (
    <Page className="home-section" pageName='LikeBox'>
      <LikeBox></LikeBox>
    </Page>);
}

export default Home;
