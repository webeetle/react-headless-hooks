import React, { FC } from 'react';
import useMediaQuery, { MediaQueryProps } from '../../src/useMediaQuery';
import { Meta } from '@storybook/react';

const fakeBreakpoints = [
  { sm: '300px ', triggerFlow: 'up' },
  { lg: '700px ', triggerFlow: 'down' },
  { md: '600px ', triggerFlow: 'up' },
  { xl: '900px ', triggerFlow: 'down' },
];

export const Simple: FC<MediaQueryProps> = ({}) => {
  const { media } = useMediaQuery({
    breakpoints: fakeBreakpoints,
  });

  console.log(media, 'media');
  return (
    <div
      style={{
        width: '500px',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <pre>{JSON.stringify(media, null)}</pre>
    </div>
  );
};

const meta: Meta = {
  title: 'useMediaQuery',
  component: Simple,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
