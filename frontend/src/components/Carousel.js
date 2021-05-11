import React from 'react';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
import Carousel, {consts} from 'react-elastic-carousel';
import Item from "./Item";
import 'styled-components';

const CarouselBox = () => {
  const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 700, itemsToShow: 1},
        { width: 800, itemsToShow: 2 },
        { width: 920, itemsToShow: 2 },
        { width: 1150, itemsToShow: 2, itemsToScroll: 2 },
        { width: 1450, itemsToShow: 3 },
        { width: 1750, itemsToShow: 3 },
      ];

      const arrowLeft = () => {
        return <i className="bi bi-caret-left"></i>
      };
      const arrowRight = () => {
        return <i className="bi bi-caret-right"></i>
      };

      const myArrow = ({type, onClick, isEdge}) => {
        const pointer = type === consts.PREV ? arrowLeft() : arrowRight();
        return (
          <div className="arr">
            <button className="arrows" onClick={onClick}>
            {pointer}
          </button>
          </div>
          
        )
      };

    return (
      <div className="carousel styling-example">
      <Carousel
      pagination={false}
      renderArrow={myArrow}
      easing="cubic-bezier(1,.15,.55,1.54)"
      tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
      transitionMs={700}
      enableAutoPlay
      autoPlaySpeed={10000}
      itemsToShow={1}
      breakPoints={breakPoints} >
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
        <Item>5</Item>
        <Item>6</Item>
      </Carousel>
      </div>
    );
};

export default CarouselBox;