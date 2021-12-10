import React, {FC} from "react";
import useStepper, {StepperProps} from "../../src/useStepper";
import './styleCarousel.css'
import { Meta } from "@storybook/react";

export const Carousel: FC<StepperProps> = ({maxStep = 3, loop = true}) => {
  const {
    currentStep,
    goToStep,
    triggerGoToPrevStep,
    triggerGoToNextStep
  } = useStepper({maxStep, loop})

  const btnItems = []
  for (let i=1; i<=maxStep; i++) {
    btnItems.push(<button type="button" className={`${currentStep===i ? 'active' : ''}`} onClick={() => goToStep(i)}>{i}</button>)
  }

  const imgItems = []
  for (let i=1; i<=maxStep; i++) {
    imgItems.push(<div className={`carousel-item ${currentStep===i ? 'active' : ''}`}>
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
      <button type="button" className="carousel-control-prev" {...triggerGoToPrevStep}>&lArr;</button>
      <button type="button" className="carousel-control-next" {...triggerGoToNextStep}>&rArr;</button>
    </div>
  );

};

const meta: Meta = {
  title: 'useStepper',
  component: Carousel,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
}

export default meta;