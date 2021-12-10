// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556\

import useSwitch, { TriggerProps, TargetProps } from '../useSwitch';

export interface DropdownProps {
  /** Is list open by default */
  isOpen?: boolean;
  /** Open List on trigger Mouse Enter */
  openListOnTriggerHover?: boolean;
  /** Open List on trigger Click */
  disableTriggerClick?: boolean;
  /** Close list on list Mouse Leave */
  closeListOnListLeave?: boolean;
  /** Close list on click outside */
  closeListOnClickOutside?: boolean;
}

export interface DropdownReturn {
  /** trigger attrs */
  trigger: TriggerProps;
  /** list attrs */
  list: TargetProps;
  /** toggle list open/close */
  toggleList: Function;
  /** open list */
  openList: Function;
  /** close list */
  closeList: Function;
  /** is list open */
  isListOpen: boolean;
}

/**
 * useDropdown() - Build your dropdown component that can be used to display a list of items.
 */
const useDropdown = (props: DropdownProps = {}): DropdownReturn => {
  const {
    isOpen = false,
    disableTriggerClick = false,
    openListOnTriggerHover = false,
    closeListOnListLeave = false,
    closeListOnClickOutside = false,
  } = props;
  const { trigger, target, toggle, turnOn, turnOff, isOn } = useSwitch({
    isOn: isOpen,
    disableTriggerClick,
    turnOnOnTriggerHover: openListOnTriggerHover,
    turnOffOnTargetLeave: closeListOnListLeave,
    turnOffOnClickOutside: closeListOnClickOutside,
  });

  return {
    trigger,
    list: target,
    toggleList: toggle,
    openList: turnOn,
    closeList: turnOff,
    isListOpen: isOn,
  };
};

export default useDropdown;
