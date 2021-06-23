import React from 'react';
import Carousel, { consts } from 'react-elastic-carousel';
import Item from './Item';
import 'styled-components';

const CarouselBox = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
  ];

  const arrowLeft = () => <i className="bi bi-caret-left" />;
  const arrowRight = () => <i className="bi bi-caret-right" />;

  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? arrowLeft() : arrowRight();
    return (
      <div className="arr">
        <button type="button" className="arrows" onClick={onClick} disabled={isEdge}>
          {pointer}
        </button>
      </div>
    );
  };

  return (
    <div className="carousel styling-example">
      <Carousel
        pagination={false}
        renderArrow={myArrow}
        easing="cubic-bezier(1,.15,.55,1.54)"
        tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
      // transitionMs={700}
      // enableAutoPlay
      // autoPlaySpeed={15000}
        itemsToShow={1}
        breakPoints={breakPoints}
      >
        <Item className="huresos"><img className="carousel-img" src="https://www.roznica.com.ua/images/bt/bt21.jpg" alt="Hello" /></Item>
        <Item className="huresos"><img className="carousel-img" src="https://www.roznica.com.ua/images/bt/bt20.jpg" alt="Hello" /></Item>
        <Item className="huresos"><img className="carousel-img" src="https://www.roznica.com.ua/images/bt/bt25.jpg" alt="Hello" /></Item>
        <Item className="huresos"><img className="carousel-img" src="https://www.roznica.com.ua/images/bt/bt22.jpg" alt="Hello" /></Item>
        <Item className="huresos"><img className="carousel-img" src="https://www.roznica.com.ua/images/bt/bt23.jpg" alt="Hello" /></Item>
        <Item className="huresos"><img className="carousel-img" src="https://www.roznica.com.ua/images/bt/bt16.jpg" alt="Hello" /></Item>
      </Carousel>
    </div>
  );
};

export default CarouselBox;
