import React, { FC } from 'react';
import useDropdown, { DropdownProps } from '../../src/useDropdown';
import { Meta } from '@storybook/react';

export const Simple: FC<DropdownProps> = (props) => {
  const { trigger, list, isListOpen } = useDropdown({ ...props });

  return (
    <>
      <div>
        <button {...trigger}>Open Dropdown</button>
      </div>
      {isListOpen && (
        <ul style={{ border: '1px solid black', padding: 3 }} {...list}>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
      )}
    </>
  );
};

const meta: Meta = {
  title: 'useDropdown',
  component: Simple,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
