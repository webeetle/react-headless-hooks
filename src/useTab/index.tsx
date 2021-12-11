import useStepper, { TriggerProps } from "../useStepper";

export interface TabProps {
  /** Number of tabs */
  numTabs: number;
  /** start from a specific tab */
  activeTab?: number;
  /** overwrite the trigger logic go to the previous tab */
  triggerGoToPrevTab?: TriggerProps;
  /** overwrite the trigger logic go to the next tab */
  triggerGoToNextTab?: TriggerProps;
}

export interface TabReturn {
  /** Current tab */
  currentTab: number;
  /** Go to the tab */
  goToTab: Function;
  /** Go to the previous tab */
  goToPrevTab: Function;
  /** Go to the next tab */
  goToNextTab: Function;
  /** Is the current step the first tab? */
  isFirstTab: boolean;
  /** Is the current step the last tab? */
  isLastTab: boolean;
  /** Can you go to the previous tab? */
  canGoToPrevTab: boolean;
  /** Can you go to the next tab? */
  canGoToNextTab: boolean;
  /** trigger prev tab attrs */
  triggerGoToPrevTab: TriggerProps;
  /** trigger next tab attrs */
  triggerGoToNextTab: TriggerProps;
}

const useTab = (props: TabProps = {
  numTabs: 3
}): TabReturn => {
  const {
    numTabs,
    activeTab = 1,
    triggerGoToPrevTab = {},
    triggerGoToNextTab = {}
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
    maxStep: numTabs,
    activeStep: activeTab,
    triggerGoToPrevStep: triggerGoToPrevTab,
    triggerGoToNextStep: triggerGoToNextTab,
  })

  return {
    currentTab: currentStep,
    goToTab: goToStep,
    goToPrevTab: goToPrevStep,
    goToNextTab: goToNextStep,
    isFirstTab: isFirstStep,
    isLastTab: isLastStep,
    canGoToPrevTab: canGoToPrevStep,
    canGoToNextTab: canGoToNextStep,
    triggerGoToPrevTab: triggerGoToPrevStep,
    triggerGoToNextTab: triggerGoToNextStep
  }
};

export default useTab;