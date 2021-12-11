import useStepper, { TriggerProps } from "../useStepper";
import {useRef} from "react";

export interface PaginationProps {
  /** Number of pages */
  numPages: number;
  /** start from a specific page */
  activePage?: number;
  /** overwrite the trigger logic go to the previous page */
  triggerGoToPrevPage?: TriggerProps;
  /** overwrite the trigger logic go to the next page */
  triggerGoToNextPage?: TriggerProps;
  /** overwrite the trigger logic go to the first page */
  triggerGoToFirstPage?: TriggerProps;
  /** overwrite the trigger logic go to the last page */
  triggerGoToLastPage?: TriggerProps;
}

export interface PaginationReturn {
  /** Current page */
  currentPage: number;
  /** Go to the page */
  goToPage: Function;
  /** Go to the previous page */
  goToPrevPage: Function;
  /** Go to the next page */
  goToNextPage: Function;
  /** Is the current step the first page? */
  isFirstPage: boolean;
  /** Is the current step the last page? */
  isLastPage: boolean;
  /** Can you go to the previous page? */
  canGoToPrevPage: boolean;
  /** Can you go to the next page? */
  canGoToNextPage: boolean;
  /** trigger prev page attrs */
  triggerGoToPrevPage: TriggerProps;
  /** trigger next page attrs */
  triggerGoToNextPage: TriggerProps;
  /** trigger first page attrs */
  triggerGoToFirstPage: TriggerProps;
  /** trigger last page attrs */
  triggerGoToLastPage: TriggerProps;
}

const usePagination = (props: PaginationProps = {
  numPages: 3
}): PaginationReturn => {
  const {
    numPages,
    activePage = 1,
    triggerGoToPrevPage = {},
    triggerGoToNextPage = {},
    triggerGoToFirstPage: triggerDefaultGoToFirstPage = {},
    triggerGoToLastPage: triggerDefaultGoToLastPage = {},
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
    maxStep: numPages,
    activeStep: activePage,
    triggerGoToPrevStep: triggerGoToPrevPage,
    triggerGoToNextStep: triggerGoToNextPage
  });

  const triggerGoToFirstPageRef = useRef(null);
  const triggerGoToLastPageRef = useRef(null);

  const triggerGoToFirstPage: TriggerProps = {
    onClick: () => {
      goToStep(1)
    },
    ...triggerDefaultGoToFirstPage,
    ref: triggerGoToFirstPageRef
  }

  const triggerGoToLastPage: TriggerProps = {
    onClick: () => {
      goToStep(numPages)
    },
    ...triggerDefaultGoToLastPage,
    ref: triggerGoToLastPageRef
  }

  return {
    currentPage: currentStep,
    goToPage: goToStep,
    goToPrevPage: goToPrevStep,
    goToNextPage: goToNextStep,
    isFirstPage: isFirstStep,
    isLastPage: isLastStep,
    canGoToPrevPage: canGoToPrevStep,
    canGoToNextPage: canGoToNextStep,
    triggerGoToPrevPage: triggerGoToPrevStep,
    triggerGoToNextPage: triggerGoToNextStep,
    triggerGoToFirstPage,
    triggerGoToLastPage
  }
};

export default usePagination;