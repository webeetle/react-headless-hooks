import {MouseEventHandler, RefObject, useEffect, useRef, useState} from "react";

export interface StepperProps {
  /** Number of steps */
  maxStep: number;
  /** overwrite the trigger logic go to the previous step */
  triggerGoToPrevStep?: TriggerProps;
  /** overwrite the trigger logic go to the next step */
  triggerGoToNextStep?: TriggerProps;
  /** overwrite the trigger logic reset step */
  triggerResetStep?: TriggerProps;
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
  /** trigger prev step attrs */
  triggerGoToPrevStep: TriggerProps;
  /** trigger next step attrs */
  triggerGoToNextStep: TriggerProps;
  /** trigger reset step attrs */
  triggerResetStep: TriggerProps;
}

export interface TriggerProps {
  ref?: RefObject<any>;
  onClick?: MouseEventHandler;
}

/**
 * useStepper() - Build your stepper component.
 */
const useStepper = (props: StepperProps = {
  maxStep: 1
}): StepperReturn => {
  const {
    maxStep,
    triggerGoToPrevStep: triggerDefaulGoToPrevStep = {},
    triggerGoToNextStep: triggerDefaulGoToNextStep = {},
    triggerResetStep: triggerDefaulResetStep = {}
  } = props
  const [currentStep, setCurrentStep] = useState(1)
  const [isFirstStep, setIsFirstStep] = useState(true)
  const [isLastStep, setIsLastStep] = useState(false)
  const triggerGoToPrevStepRef = useRef(null)
  const triggerGoToNextStepRef = useRef(null)
  const triggerResetStepRef = useRef(null)

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

  const triggerGoToPrevStep: TriggerProps = {
    onClick: () => {
      goToPrevStep()
    },
    ...triggerDefaulGoToPrevStep,
    ref: triggerGoToPrevStepRef
  }

  const triggerGoToNextStep: TriggerProps = {
    onClick: () => {
      goToNextStep()
    },
    ...triggerDefaulGoToNextStep,
    ref: triggerGoToNextStepRef
  }

  const triggerResetStep: TriggerProps = {
    onClick: () => {
      reset()
    },
    ...triggerDefaulResetStep,
    ref: triggerResetStepRef
  }


  return {
    currentStep,
    goToStep,
    goToPrevStep,
    goToNextStep,
    isFirstStep,
    isLastStep,
    reset,
    canGoToPrevStep,
    canGoToNextStep,
    triggerGoToPrevStep,
    triggerGoToNextStep,
    triggerResetStep
  }
}

export default useStepper;