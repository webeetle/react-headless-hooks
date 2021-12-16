import React, {FC} from "react";
import useCarousel, {CarouselProps} from "../../src/useCarousel";
import './styleSimpleCarousel.css'
import { Meta } from "@storybook/react";

export const Simple: FC<CarouselProps> = ({maxSlide = 3, loop = true, activeSlide = 1}) => {
  const {
    currentSlide,
    goToSlide,
    triggerGoToPrevSlide,
    triggerGoToNextSlide
  } = useCarousel({maxSlide, loop, activeSlide})

  const btnItems = []
  for (let i=1; i<=maxSlide; i++) {
    btnItems.push(<button type="button" className={`${currentSlide===i ? 'active' : ''}`} onClick={() => goToSlide(i)}>{i}</button>)
  }

  const imgItems = []
  for (let i=1; i<=maxSlide; i++) {
    imgItems.push(<div className={`carousel-item ${currentSlide===i ? 'active' : ''}`}>
      <img alt={`img ${i}`} src={`https://via.placeholder.com/750x400?text=Slide+${i}`}/>
    </div>)
  }

  return (
    <div className="carousel-stepper">
      <div className="carousel-indicators">
        {btnItems}
      </div>
      <div className="carousel-inner">
        {imgItems}
      </div>
      <button type="button" className="carousel-control-prev" {...triggerGoToPrevSlide}>&lArr;</button>
      <button type="button" className="carousel-control-next" {...triggerGoToNextSlide}>&rArr;</button>
    </div>
  );

};

const meta: Meta = {
  title: 'useCarousel',
  component: Simple,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
}

export default meta;