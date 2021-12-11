import React, {FC} from "react";
import usePagination, {PaginationProps} from "../../src/usePagination";
import './styleSimplePagination.css'
import {Meta} from "@storybook/react";

export const Simple: FC<PaginationProps> = ({numPages = 3, activePage = 1}) => {
  const {
    currentPage,
    goToPage,
    isFirstPage,
    isLastPage,
    canGoToPrevPage,
    canGoToNextPage,
    triggerGoToPrevPage,
    triggerGoToNextPage,
    triggerGoToFirstPage,
    triggerGoToLastPage
  } = usePagination({numPages, activePage})

  const pageItems = []
  pageItems.push(<li className={`page-item ${isFirstPage && 'disabled'}`}>
    <button className="page-link" aria-label="First" {...triggerGoToFirstPage}>First</button>
  </li>)
  pageItems.push(<li className={`page-item ${canGoToPrevPage || 'disabled'}`}>
    <button className="page-link" aria-label="Previous" {...triggerGoToPrevPage}>Previous</button>
  </li>)
  for (let i=1; i<=numPages; i++) {
    pageItems.push(<li className={`page-item ${currentPage===i ? 'active' : ''}`}>
      <button className="page-link" onClick={() => goToPage(i)}>{i}</button>
    </li>)
  }
  pageItems.push(<li className={`page-item ${canGoToNextPage || 'disabled'}`}>
    <button className="page-link" aria-label="Next" {...triggerGoToNextPage}>Next</button>
  </li>)
  pageItems.push(<li className={`page-item ${isLastPage && 'disabled'}`}>
    <button className="page-link" aria-label="Last" {...triggerGoToLastPage}>Last</button>
  </li>)

  return (
    <div className="pagination-stepper">
      <ul className="pagination">
        {pageItems}
      </ul>
    </div>
  );
};

const meta: Meta = {
  title: 'usePagination',
  component: Simple,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
}

export default meta;