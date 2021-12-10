// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556\

import {
  useState,
  useRef,
  useEffect,
  MouseEventHandler,
  RefObject,
  useCallback,
} from 'react';
import useHasClickedOutside from '../useHasClickedOutside';

export interface SwitchProps {
  /** Is switch on? By default false */
  isOn?: boolean;
  /** Turn on if the mouse enter in the trigger */
  turnOnOnTriggerHover?: boolean;
  /** Turn off if the mouse leave the trigger */
  turnOffOnTriggerLeave?: boolean;
  /** disable the trigger click */
  disableTriggerClick?: boolean;
  /** Disable target on target Mouse Leave */
  turnOffOnTargetLeave?: boolean;
  /** Disable target on click outside */
  turnOffOnClickOutside?: boolean;
}

export interface SwitchReturn {
  /** trigger attrs */
  trigger: TriggerProps;
  /** target attrs */
  target: TargetProps;
  /** toggle switch on/off */
  toggle: Function;
  /** turn off switch */
  turnOn: Function;
  /** turn off the switch */
  turnOff: Function;
  /** is the switch on */
  isOn: boolean;
}

export interface TriggerProps {
  ref?: RefObject<any>;
  onClick?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
}

export interface TargetProps {
  ref?: RefObject<any>;
  onMouseLeave?: MouseEventHandler;
}

/**
 * useSwitch() - simulate a switch on/off logic.
 */
const useSwitch = (props: SwitchProps = {}): SwitchReturn => {
  const {
    isOn: isOnDefault = false,
    disableTriggerClick = false,
    turnOnOnTriggerHover = false,
    turnOffOnTriggerLeave = false,
    turnOffOnTargetLeave = false,
    turnOffOnClickOutside = false,
  } = props;
  const [isOn, setIsOn] = useState(isOnDefault);
  const targetRef = useRef(null);
  const triggerRef = useRef(null);
  const hasClickedOutsideTarget = useHasClickedOutside(targetRef);

  const toggle = useCallback(() => {
    setIsOn((old) => !old);
  }, []);
  const turnOn = useCallback(() => {
    setIsOn(true);
  }, []);
  const turnOff = useCallback(() => {
    setIsOn(false);
  }, []);

  useEffect(() => {
    if (turnOffOnClickOutside && hasClickedOutsideTarget) {
      turnOff();
    }
  }, [hasClickedOutsideTarget]);

  const trigger: TriggerProps = {
    onClick: useCallback(() => {
      !disableTriggerClick ? toggle() : null;
    }, [disableTriggerClick]),
    onMouseEnter: useCallback(() => {
      turnOnOnTriggerHover ? turnOn() : null;
    }, [turnOnOnTriggerHover]),
    onMouseLeave: useCallback(() => {
      turnOffOnTriggerLeave ? turnOff() : null;
    }, [turnOffOnTriggerLeave]),
    ref: triggerRef,
  };

  const target: TargetProps = {
    onMouseLeave: useCallback(() => {
      turnOffOnTargetLeave ? turnOff() : null;
    }, [turnOffOnTargetLeave]),
    ref: targetRef,
  };
  return {
    trigger,
    target,
    toggle,
    turnOn,
    turnOff,
    isOn,
  };
};

export default useSwitch;
