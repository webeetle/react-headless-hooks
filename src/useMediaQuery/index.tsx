import { useEffect, useState } from 'react';

export interface MediaQueryProps {
  /** Breakpoints data */
  breakpoints?: Array<IBreakPoints>;
}

export interface AccordionPropsReturn {
  /** Breakpoints data given by prop*/
  breakpointsDefault: Array<IBreakPoints>;
  /** Breakpoints Object with Media Listner Attached*/
  media: IMediaQuery;
}

interface IBreakPoints {
  xs?: String;
  sm?: String;
  md?: String;
  lg?: String;
  xl?: String;
  triggerFlow: String;
}

interface IMediaQuery {
  xs?: Boolean;
  sm?: Boolean;
  md?: Boolean;
  lg?: Boolean;
  xl?: Boolean;
}

const useMediaQuery = (props: MediaQueryProps = {}) => {
  const { breakpoints: breakpointsDefault = [] } = props;

  const getBreakPoint = (obj: any, getValue = true) => {
    const allBreaks = ['xs', 'sm', 'md', 'lg', 'xl'];
    let returned;
    for (const key in obj) {
      if (allBreaks.includes(key) && getValue) {
        returned = obj[key];
      } else {
        returned = key;
      }
      break;
    }
    return returned;
  };

  const buildMediaQueryForEachObject = () => {
    const obj: any = {};
    const min = 'min';
    const max = 'max';
    breakpointsDefault.forEach((el: IBreakPoints) => {
      const { triggerFlow, ...rest } = el;
      const triggerMedia = triggerFlow === 'up' ? min : max;
      obj[`${getBreakPoint(rest, false)}`] = window.matchMedia(
        `(${triggerMedia}-width: ${getBreakPoint(rest)})`
      ).matches;
    });
    return obj;
  };

  const [media] = useState<IMediaQuery>(() => buildMediaQueryForEachObject());

  useEffect(() => {}, [media['xl']]);

  return { breakpointsDefault, media };
};

export default useMediaQuery;
