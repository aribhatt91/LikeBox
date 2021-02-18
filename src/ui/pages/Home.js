import React, {Component} from 'react';
import Page from './Page';
import Hero from '../components/Hero';
import LikeBox from '../components/LikeBox';

class Home extends Page {
  render() {
    return (
    <div className="page home-section">
      {/* <Hero></Hero>
      <p className="home-title">Home</p>
      <p>Default Home Page content. No target offer is active.</p>
      <p>Just a list of Harry Potter Books</p> */}
      <LikeBox></LikeBox>
      {/* <BookList/>
      <BookDetail/> */}
      
    </div>);
  }
}

export default Home;
