// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556\

import {
  useState,
  useRef,
  useEffect,
  MouseEventHandler,
  RefObject,
} from 'react';
import useHasClickedOutside from '../useHasClickedOutside';

export interface DropdownProps {
  /** Is list open by default */
  isOpen?: boolean;
  /** Open List on trigger Mouse Enter */
  openListOnTriggerHover?: boolean;
  /** Open List on trigger Click */
  openListOnTriggerCLick?: boolean;
  /** Close list on list Mouse Leave */
  closeListOnListLeave?: boolean;
  /** Close list on click outside */
  closeListOnClickOutside?: boolean;
  /** override the trigger logic */
  trigger?: TriggerProps;
  /** override the list logic */
  list?: ListProps;
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
  ref?: RefObject<any>;
  onClick?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
}

export interface ListProps {
  ref?: RefObject<any>;
  onMouseLeave?: MouseEventHandler;
}

/**
 * useDropdown() - Build your dropdown component that can be used to display a list of items.
 */
const useDropdown = (props: DropdownProps = {}): DropdownReturn => {
  const {
    isOpen: isOpenDefault = false,
    openListOnTriggerCLick = true,
    openListOnTriggerHover = false,
    closeListOnListLeave = false,
    closeListOnClickOutside = false,
    trigger: triggerDefault = {},
    list: listDefault = {},
  } = props;
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  const listRef = useRef(null);
  const triggerRef = useRef(null);
  const hasClickedOutsideList = useHasClickedOutside(listRef);

  const toggleList = (): void => {
    setIsOpen((old) => !old);
  };
  const openList = (): void => {
    setIsOpen(true);
  };
  const closeList = (): void => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (closeListOnClickOutside && hasClickedOutsideList) {
      closeList();
    }
  }, [hasClickedOutsideList]);

  const trigger: TriggerProps = {
    onClick: () => {
      openListOnTriggerCLick ? toggleList() : null;
    },
    onMouseEnter: () => {
      openListOnTriggerHover ? openList() : null;
    },
    ...triggerDefault,
    ref: triggerRef,
  };

  const list: ListProps = {
    onMouseLeave: () => {
      closeListOnListLeave ? closeList() : null;
    },

    ...listDefault,
    ref: listRef,
  };
  return { trigger, list, toggleList, openList, closeList, isListOpen: isOpen };
};

export default useDropdown;
