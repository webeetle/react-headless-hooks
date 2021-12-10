import React, { FC } from 'react';
import useSwitch, { SwitchProps } from '../../src/useSwitch';
import { Meta } from '@storybook/react';

export const Simple: FC<SwitchProps> = ({
  isOn: isOnDefault = false,
  disableTriggerClick = false,
  turnOnOnTriggerHover = false,
  turnOffOnTriggerLeave = false,
  turnOffOnTargetLeave = false,
  turnOffOnClickOutside = false,
}) => {
  const { trigger, target, isOn } = useSwitch({
    isOn: isOnDefault,
    disableTriggerClick,
    turnOnOnTriggerHover,
    turnOffOnTriggerLeave,
    turnOffOnTargetLeave,
    turnOffOnClickOutside,
  });

  return (
    <>
      <div>
        <button {...trigger}>Trigger Switch</button>
      </div>
      <div>The switch is {isOn ? 'On' : 'Off'}</div>

      {isOn && <div {...target}>Target visible only if the switch is On</div>}
    </>
  );
};

const meta: Meta = {
  title: 'useSwitch',
  component: Simple,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
