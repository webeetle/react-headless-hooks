// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556\

import useSwitch, { TriggerProps, TargetProps } from '../useSwitch';

export interface TooltipProps {
  /** is tooltip visible by default */
  isVisible?: boolean;
  /** show tooltip on click and not hover */
  showOnClick?: boolean;
  /** Close list on list Mouse Leave */
  hiddenTooltipOnTriggerLeave?: boolean;
  /** Close list on click outside */
  closeTooltipOnClickOutside?: boolean;
}

export interface TooltipReturn {
  /** trigger attrs */
  trigger: TriggerProps;
  /** list attrs */
  tooltip: TargetProps;
  /** toggle list open/close */
  toggleTooltip: Function;
  /** open list */
  showTooltip: Function;
  /** close list */
  hiddenTooltip: Function;
  /** is list open */
  isVisible: boolean;
}

/**
 * useDropdown() - Build your dropdown component that can be used to display a list of items.
 */
const useDropdown = (props: TooltipProps = {}): TooltipReturn => {
  const {
    isVisible = false,
    showOnClick = false,
    hiddenTooltipOnTriggerLeave = true,
    closeTooltipOnClickOutside = false,
  } = props;
  const { trigger, target, toggle, turnOn, turnOff, isOn } = useSwitch({
    isOn: isVisible,
    disableTriggerClick: !showOnClick,
    turnOnOnTriggerHover: !showOnClick,
    turnOffOnTriggerLeave: hiddenTooltipOnTriggerLeave,
    turnOffOnClickOutside: closeTooltipOnClickOutside,
  });

  return {
    trigger,
    tooltip: target,
    toggleTooltip: toggle,
    showTooltip: turnOn,
    hiddenTooltip: turnOff,
    isVisible: isOn,
  };
};

export default useDropdown;
