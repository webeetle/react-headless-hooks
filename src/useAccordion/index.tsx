import { useState, useEffect, ReactNode } from 'react';

export interface AccordionData {
  title: ReactNode;
  content: ReactNode;
}
export interface AccordionProps {
  /** Indexes of Accordion Items */
  data?: Array<AccordionData>;
  /** Trigger on Item status change */
  onChange?: Function;
  /** Set Default All Panels State */
  expandAll?: boolean;
  /** Set Specific Default Panels State By Indexes */
  expandByIndexes?: Array<number>;
}

export interface AccordionPropsReturn {
  accordion?: Array<Object>;
  currentOpenPanels: Array<Object>;
}

const useAccordion = (props: AccordionProps = {}) => {
  const {
    data: defaultData = [],
    onChange: onChangePanelStatus = null,
    expandAll = false,
    expandByIndexes = [],
  } = props;

  const isExpandedByDefault = (
    indexesArray: Array<number>,
    currentIndex: number
  ): Boolean => {
    if (indexesArray.includes(currentIndex)) return true;
    return false;
  };

  const onChangePanelStatusHandler = (indexElement: number): void => {
    const arrayCopy = [...accordion];
    const ps = arrayCopy.findIndex((el: any) => el.index === indexElement);
    arrayCopy[ps]['isExpanded'] = !arrayCopy[ps]?.isExpanded;
    return setAccordion(arrayCopy);
  };

  const getCurrentOpenPanels = (accordionState: any[]): any[] => {
    return [...accordionState].filter((el: any) => el.isExpanded);
  };

  const [currentOpenPanels, setCurrentOpenPanels] = useState<Array<any>>([]);
  const [accordion, setAccordion] = useState<Array<any>>(() =>
    defaultData
      ? defaultData.map((el: Object, index: number) => ({
          ...el,
          index,
          isExpanded: expandAll
            ? expandAll
            : isExpandedByDefault(expandByIndexes, index)
            ? true
            : false,
          trigger: (indexElement: number) => {
            return {
              onClick: () => onChangePanelStatusHandler(indexElement),
            };
          },
        }))
      : []
  );

  useEffect(() => {
    if (onChangePanelStatus) {
      onChangePanelStatus(accordion);
    }
    if (accordion.length > 0) {
      setCurrentOpenPanels(getCurrentOpenPanels(accordion));
    }
  }, [accordion]);

  return { accordion, currentOpenPanels };
};

export default useAccordion;
