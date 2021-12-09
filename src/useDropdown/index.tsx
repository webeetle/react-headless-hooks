// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556\

import { useState, MouseEventHandler } from 'react';

export interface DropdownProps {
  /** Open List on trigger Mouse Enter */
  openListOnHover?: boolean;
  /** Close list on list Mouse Leave */
  closeListOnLeave?: boolean;
  /** override the trigger logic */
  trigger?: TriggerProps;
}

export interface DropdownReturn {
  /** trigger attrs */
  trigger: TriggerProps;
  /** list attrs */
  list: ListProps;
  /** toggle list open/close */
  toggleList: Function;
  /** open list */
  openList: Function;
  /** close list */
  closeList: Function;
  /** is list open */
  isListOpen: boolean;
}

export interface TriggerProps {
  onClick?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
}

export interface ListProps {
  onMouseLeave?: MouseEventHandler;
}

/**
 * useDropdown() - Build your dropdown component that can be used to display a list of items.
 */
const useDropdown = ({
  openListOnHover = false,
  closeListOnLeave = false,
  trigger: triggerDefault = {},
}: DropdownProps): DropdownReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = (): void => {
    setIsOpen((old) => !old);
  };
  const openList = (): void => {
    setIsOpen(true);
  };
  const closeList = (): void => {
    setIsOpen(false);
  };

  const trigger: TriggerProps = {
    onClick: () => {
      toggleList();
    },
    onMouseEnter: () => {
      openListOnHover ? openList() : null;
    },
    ...triggerDefault,
  };

  const list: ListProps = {
    onMouseLeave: () => {
      closeListOnLeave ? closeList() : null;
    },
  };
  return { trigger, list, toggleList, openList, closeList, isListOpen: isOpen };
};

export default useDropdown;
