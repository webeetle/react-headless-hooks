import React, { FC, HTMLAttributes, ReactChild } from 'react';
import { Meta, Story } from '@storybook/react';
import useDropdown, { DropdownProps } from '../src/useDropdown';

const MyDropdown: FC<DropdownProps> = (props) => {
  const { trigger, list, isListOpen } = useDropdown({ ...props });

  return (
    <>
      <div>
        <div {...trigger}>Open Dropdown</div>
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
  component: MyDropdown,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DropdownProps> = (args) => (
  <>
    <MyDropdown {...args} />
  </>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  /** trigger element onClick */
  openListOnHover: false,
  /** trigger element onClick */
  closeListOnLeave: false,
  trigger: {},
};
