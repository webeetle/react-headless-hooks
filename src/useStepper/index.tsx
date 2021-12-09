import {useEffect, useState} from "react";

export interface StepperProps {
  /** Number of steps */
  maxStep: number;
}

export interface StepperReturn {
  /** Current step */
  currentStep: number;
  /** Go to the step */
  goToStep: Function;
  /** Go to the previous step */
  goToPrevStep: Function;
  /** Go to the next step */
  goToNextStep: Function;
  /** Is the current step the first step? */
  isFirstStep: boolean;
  /** Is the current step the last step? */
  isLastStep: boolean;
  /** Go to the first step */
  reset: Function;
  /** Can you go to the previous step? */
  canGoToPrevStep: boolean;
  /** Can you go to the next step? */
  canGoToNextStep: boolean;
}

/**
 * useStepper() - Build your stepper component.
 */
const useStepper = (props: StepperProps = {
  maxStep: 1
}): StepperReturn => {
  const {maxStep} = props
  const [currentStep, setCurrentStep] = useState(1)
  const [isFirstStep, setIsFirstStep] = useState(true)
  const [isLastStep, setIsLastStep] = useState(false)

  const canGoToPrevStep = currentStep - 1 >= 1;
  const canGoToNextStep = currentStep + 1 <= maxStep;

  const goToPrevStep = () => {
    if (canGoToPrevStep) {
      setCurrentStep(step => step - 1)
    }
  }

  const goToNextStep = () => {
    if (canGoToNextStep) {
      setCurrentStep(step => step + 1)
    }
  }

  const reset = () => {
    setCurrentStep(1)
  }

  const goToStep = (step: number) => {
    if (step >= 1 && step <= maxStep) {
      setCurrentStep(step)
    }
  }

  useEffect(() => {
    setIsFirstStep(false)
    setIsLastStep(false)
    if (currentStep === 1) {
      setIsFirstStep(true)
    }
    if (currentStep === maxStep) {
      setIsLastStep(true)
    }

    return () => {
      setIsFirstStep(true)
      setIsLastStep(false)
    }
  }, [currentStep])


  return {
    currentStep,
    goToStep,
    goToPrevStep,
    goToNextStep,
    isFirstStep,
    isLastStep,
    reset,
    canGoToPrevStep,
    canGoToNextStep
  }
}

export default useStepper;