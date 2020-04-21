import Carousel from 'react-bootstrap/Carousel';
import React, {Component} from 'react';

class HeroSlider extends Component {
    ControlledCarousel() {
        return this.props.sliderItems.map((item, index) => {
                  return (
                  <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={item.slider_image}
                        alt={item.slider_label}
                    />
                    <Carousel.Caption>
                        {/* <h3>{item.slider_label}</h3>
                        <p>{item.slider_text}</p> */}
                    </Carousel.Caption>
                    </Carousel.Item>
                )
              });
      }
      
      render(){
        // const [index, setIndex] = useState(0);
        // const [direction, setDirection] = useState(null);
      
        // const handleSelect = (selectedIndex, e) => {
        //   setIndex(selectedIndex);
        //   setDirection(e.direction);
        // };
        return (
            <Carousel  >
                {this.ControlledCarousel()}
            </Carousel>
        )
      }

}

export default HeroSlider;