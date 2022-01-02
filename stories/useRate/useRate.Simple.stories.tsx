import React, {FC} from "react";
import useRate, {RateProps} from "../../src/useRate";
import {Meta} from "@storybook/react";

export const Simple: FC<RateProps> = ({numRate = 5}) => {
  const {
    currentRate,
    onChangeRate,
    isFirstRate,
    isLastRate,
    isReset,
    clearRate,
    triggerClearRate
  } = useRate({numRate});

  const stars = [];
  for (let i = 1; i <= numRate; i++) {
    stars.push(<button type="button" key={i} onClick={() => onChangeRate(i)}>{i}</button>)
  }

  return (
    <>
      <div>
        <strong>rate: {currentRate}</strong>
      </div>
      <div>
        {stars}
        <button onClick={() => clearRate()}>clear rate</button>
        <button {...triggerClearRate}>clear rate</button>
      </div>
      {isFirstRate && <div>first rate</div>}
      {isLastRate && <div>last rate</div>}
      {isReset && <div>reset rate</div>}
    </>
  )
}

const meta: Meta = {
  title: 'useRate',
  component: Simple,
  argTypes: { },
  parameters: {
    controls: { expanded: true },
  }
}

export default meta;