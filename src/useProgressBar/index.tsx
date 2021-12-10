import { useState, useEffect, useRef, RefObject, Ref } from 'react';

export interface ProgressBarProps {
  /** override the bar percentuage */
  percentuage?: number;
  /** Trigger on percentuage change */
  onChange?: Function;
  onComplete?: Function;
}

export interface ProgressBarReturn {
  percentuage: number;
  isEmpty: Boolean;
  isCompleted: Boolean;
  increment: Function;
  decrement: Function;
  reset: Function;
  complete: Function;
  empty: Function;
}

const useProgressBar = (props: ProgressBarProps = {}) => {
  const {
    percentuage: defaultPercentuage = 0,
    onChange = null,
    onComplete = null,
  } = props;
  const [percentuage, setPercentuage] = useState(defaultPercentuage);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (onChange) {
      onChange(percentuage);
    }

    if (percentuage === 100 && onComplete) {
      onComplete(percentuage);
    }

    if (percentuage === 100) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }

    if (percentuage === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [percentuage]);

  const reset = (): void => {
    setPercentuage(defaultPercentuage);
  };
  const empty = (): void => {
    setPercentuage(0);
  };
  const complete = (): void => {
    setPercentuage(100);
  };
  const increment = (value: number): void => {
    setPercentuage((prev) => (prev + value <= 100 ? prev + value : 100));
  };

  const decrement = (value: number): void => {
    setPercentuage((prev) => (prev - value >= 0 ? prev - value : 0));
  };

  return {
    percentuage,
    increment,
    decrement,
    reset,
    complete,
    empty,
    isCompleted,
    isEmpty,
  };
};

export default useProgressBar;
