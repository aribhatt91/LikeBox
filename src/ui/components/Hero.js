import React, {Component} from 'react';
import C2 from '../../assets/img/c2.png';
import C3 from '../../assets/img/c3.png';
import C4 from '../../assets/img/c4.png';
import HeroSlider from './generic/HeroSlider';

class Hero extends Component {
  HERO = [{
    slider_image: C2,
    slider_label: 'Kids'
  },
  {
    slider_image: C3,
    slider_label: 'Women'
  },
  {
    slider_image: C4,
    slider_label: 'Men'
  }];
  render() {
    
    return (
        <section className="hero_section">
          <HeroSlider sliderItems={this.HERO}></HeroSlider>
        </section>
    );
  }
}

export default Hero;
