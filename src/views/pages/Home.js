import React, {Component} from 'react';
import Page from './Page';
import Hero from '../components/Hero';

class Home extends Page {
  render() {
    return (
    <div className="home-section">
      <Hero></Hero>
      <p className="home-title">Home</p>
      <p>Default Home Page content. No target offer is active.</p>
      <p>Just a list of Harry Potter Books</p>
      {/* <BookList/>
      <BookDetail/> */}
      
    </div>);
  }
}

export default Home;
