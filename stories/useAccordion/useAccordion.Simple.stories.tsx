import React, { FC } from 'react';
import useAccordion, { AccordionProps } from '../../src/useAccordion';
import { Meta } from '@storybook/react';

const fakeData = [
  { title: 'Title 1', content: 'content 1' },
  { title: 'Title 2', content: 'content 2' },
  { title: 'Title 3', content: 'content 3' },
];

export const Simple: FC<AccordionProps> = ({}) => {
  const { accordion, currentOpenPanels } = useAccordion({
    data: fakeData,
    onChange: (state) => null,
    expandAll: true,
    expandByIndexes: [0, 2],
  });

  return (
    <div
      style={{
        width: '800px',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{ border: '1px solid black', width: '100%', padding: '1rem' }}
      >
        {accordion &&
          accordion.map(({ title, content, trigger, isExpanded }, index) => (
            <div
              style={{ border: '1px solid red', padding: '0.5rem' }}
              {...trigger(index)}
              key={index}
            >
              <p>{title}</p>
              {isExpanded && (
                <div style={{ borderTop: '1px solid red', padding: '0.5rem' }}>
                  {content}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'useAccordion',
  component: Simple,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
