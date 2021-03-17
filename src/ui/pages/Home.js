import React, {Component} from 'react';
import Page from './Page';
import Hero from '../components/Hero';
import LikeBox from '../components/LikeBox';

class Home extends Page {
  render() {
    return (
    <div className="page home-section">
      <LikeBox></LikeBox>
    </div>);
  }
}

export default Home;
