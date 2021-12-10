import { useState, useEffect, useRef, RefObject, Ref } from 'react';

export interface ProgressBarProps {
  /** override the bar percentuage */
  percentuage?: number;
  /** Trigger on percentuage change */
  onChange?: Function;
}

export interface ProgressBarReturn {
  percentuage: number;
  increment: Function;
  decrement: Function;
  reset: Function;
  complete: Function;
  empty: Function;
}

const useProgressBar = (props: ProgressBarProps = {}) => {
  const { percentuage: defaultPercentuage = 0, onChange = null } = props;
  const [percentuage, setPercentuage] = useState(defaultPercentuage);

  useEffect(() => {
    if (onChange) {
      onChange(percentuage);
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
  };
};

export default useProgressBar;
