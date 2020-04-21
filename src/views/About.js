import React, {Component} from 'react';
import Page from './pages/Page';
class About extends Page {

  render() {
    return (
    <div className="about-section">
        <h3>"I would like to say a few words. And here they are: Nitwit! Blubber! Oddment! Tweak!"</h3>
        <h4> - Albus Dumbledore</h4>
    </div>);
  }
}

export default About;
