import React, {FC} from "react";
import useStepper, {StepperProps} from "../../src/useStepper";
import { Meta } from "@storybook/react";

export const Simple: FC<StepperProps> = ({maxStep= 10, activeStep = 3}) => {
  const {
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
  } = useStepper({maxStep, activeStep})

  return (
    <>
      <div>
        <div>
          <strong>step: {currentStep}</strong>
        </div>
        <div>
          <button {...triggerGoToPrevStep}>prev</button>
          <button {...triggerGoToNextStep}>next</button>
          <button {...triggerResetStep}>reset</button>
        </div>
        <div>
          <button onClick={() => {
            if (!canGoToPrevStep) {
              alert("it's not possible to go to the previous step")
            }
            else {
              goToPrevStep()
            }
          }}>prev custom</button>
          <button onClick={() => {
            if (!canGoToNextStep) {
              alert("it's not possible to go to the next step")
            }
            else {
              goToNextStep()
            }
          }}>next custom</button>
          <button onClick={() => {
            let result = confirm("Are you sure?")
            if (result === true)
              reset()
          }}>reset</button>
        </div>
        <div>
          <button onClick={() => goToStep(5)}>go to step 5</button>
          <button onClick={() => goToStep(maxStep)}>go to last step</button>
        </div>
        {isFirstStep && <div>first step</div>}
        {isLastStep && <div>last step</div>}
      </div>
    </>
  );
};

const meta: Meta = {
  title: 'useStepper',
  component: Simple,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
}

export default meta;