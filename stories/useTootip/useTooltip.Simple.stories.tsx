import React, { FC } from 'react';
import useTooltip, { TooltipProps } from '../../src/useTooltip';
import { Meta } from '@storybook/react';

export const Simple: FC<TooltipProps> = ({
  isVisible: isVisibleDefault = false,
  showOnClick = false,
  closeTooltipOnClickOutside = false,
  hiddenTooltipOnTriggerLeave = true,
}) => {
  const { trigger, tooltip, isVisible } = useTooltip({
    isVisible: isVisibleDefault,
    showOnClick,
    closeTooltipOnClickOutside,
    hiddenTooltipOnTriggerLeave,
  });

  return (
    <div style={{ marginTop: 30 }}>
      <p>
        To open a tooltip{' '}
        <span
          {...trigger}
          style={{ textDecoration: 'underline', position: 'relative' }}
        >
          hover here
          {isVisible && (
            <div
              style={{
                position: 'absolute',
                bottom: -50,
                width: 200,
              }}
              {...tooltip}
            >
              <p>Lorem ipusm dolor sit amet</p>
            </div>
          )}
        </span>
      </p>
    </div>
  );
};

const meta: Meta = {
  title: 'useTooltip',
  component: Simple,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
