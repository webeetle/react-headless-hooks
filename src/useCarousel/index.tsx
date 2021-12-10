import useStepper, { TriggerProps } from "../useStepper";

export interface CarouselProps {
  /** Number of slides */
  maxSlide: number;
  /** infinite loop */
  loop: boolean;
  /** start from a specific slide */
  activeSlide?: number;
  /** overwrite the trigger logic go to the previous slide */
  triggerGoToPrevSlide?: TriggerProps;
  /** overwrite the trigger logic go to the next slide */
  triggerGoToNextSlide?: TriggerProps;
}

export interface CarouselReturn {
  /** Current slide */
  currentSlide: number;
  /** Go to the slide */
  goToSlide: Function;
  /** Go to the previous slide */
  goToPrevSlide: Function;
  /** Go to the next slide */
  goToNextSlide: Function;
  /** Is the current step the first slide? */
  isFirstSlide: boolean;
  /** Is the current step the last slide? */
  isLastSlide: boolean;
  /** Can you go to the previous slide? */
  canGoToPrevSlide: boolean;
  /** Can you go to the next slide? */
  canGoToNextSlide: boolean;
  /** trigger prev slide attrs */
  triggerGoToPrevSlide: TriggerProps;
  /** trigger next slide attrs */
  triggerGoToNextSlide: TriggerProps;
}

const useCarousel = (props: CarouselProps = {
  maxSlide: 1,
  loop: true
}): CarouselReturn => {
  const {
    maxSlide,
    loop,
    activeSlide = 1,
    triggerGoToPrevSlide = {},
    triggerGoToNextSlide = {}
  } = props;
  const {
    currentStep,
    goToStep,
    goToPrevStep,
    goToNextStep,
    isFirstStep,
    isLastStep,
    canGoToPrevStep,
    canGoToNextStep,
    triggerGoToPrevStep,
    triggerGoToNextStep
  } = useStepper({
    maxStep: maxSlide,
    loop,
    activeStep: activeSlide,
    triggerGoToPrevStep: triggerGoToPrevSlide,
    triggerGoToNextStep: triggerGoToNextSlide
  })

  return {
    currentSlide: currentStep,
    goToSlide: goToStep,
    goToPrevSlide: goToPrevStep,
    goToNextSlide: goToNextStep,
    isFirstSlide: isFirstStep,
    isLastSlide: isLastStep,
    canGoToPrevSlide: canGoToPrevStep,
    canGoToNextSlide: canGoToNextStep,
    triggerGoToPrevSlide: triggerGoToPrevStep,
    triggerGoToNextSlide: triggerGoToNextStep
  }
};

export default useCarousel;