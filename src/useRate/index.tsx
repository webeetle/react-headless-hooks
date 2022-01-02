import { MouseEventHandler, RefObject, useCallback, useEffect, useRef, useState} from "react";

export interface RateProps {
  /* number of rates */
  numRate: number;
  /* start from a specific rate */
  activeRate?: number;
  /* reset when click again */
  allowClear?: boolean;
  /** overwrite the trigger logic clear rate */
  triggerClearRate?: TriggerProps;
}

export interface RateReturn {
  /** Current rate */
  currentRate: number;
  /** change the rate */
  onChangeRate: Function;
  /** Is the current rate the first rate? */
  isFirstRate: boolean;
  /** Is the current rate the last rate? */
  isLastRate: boolean;
  /** Is the current rate the reset rate? */
  isReset: boolean;
  /** Reset when click again */
  clearRate: Function;
  /** trigger clear rate */
  triggerClearRate: TriggerProps;
}

export interface TriggerProps {
  ref?: RefObject<any>;
  onClick?: MouseEventHandler;
}

/**
 * useRate() - Build your rate component.
 */
const useRate = (props: RateProps = {
  numRate: 5
}): RateReturn => {
  const {
    numRate,
    activeRate = 0,
    allowClear = true,
    triggerClearRate: triggerDefaultClearRate = {}
  } = props;

  const [currentRate, setCurrentRate] = useState(activeRate)
  const [isFirstRate, setIsFirstRate] = useState(true);
  const [isLastRate, setIsLastRate] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const triggerClearRateRef = useRef(null)

  const onChangeRate = useCallback((value: number) => {
    if (value >=1 && value <= numRate) {
      if (allowClear && value === currentRate) {
        setCurrentRate(0)
      }
      else {
        setCurrentRate(value)
      }
    }
  }, [numRate, currentRate, allowClear])

  const clearRate = useCallback(() => {
    if (allowClear) {
      setCurrentRate(0)
    }
    else {
      setCurrentRate(1)
    }
  }, [currentRate, allowClear])

  useEffect(() => {
    setIsFirstRate(false)
    setIsLastRate(false)
    setIsReset(false)
    if (currentRate === 1) {
      setIsFirstRate(true)
    }
    if (currentRate === numRate) {
      setIsLastRate(true)
    }
    if (currentRate === 0) {
      setIsReset(true)
    }

    return () => {
      setIsFirstRate(true)
      setIsLastRate(false)
      setIsReset(false)
    }
  }, [currentRate])

  const triggerClearRate: TriggerProps = {
    onClick: () => {
      clearRate()
    },
    ...triggerDefaultClearRate,
    ref: triggerClearRateRef
  }

  return {
    currentRate,
    onChangeRate,
    isFirstRate,
    isLastRate,
    isReset,
    clearRate,
    triggerClearRate
  }
}

export default useRate;