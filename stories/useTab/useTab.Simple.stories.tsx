import React, {FC} from "react";
import useTab, {TabProps} from "../../src/useTab";
import './styleSimpleTab.css'
import { Meta } from "@storybook/react";

export const Simple: FC<TabProps> = ({numTabs = 3, activeTab = 1}) => {
  const {
    currentTab,
    goToTab,
    triggerGoToPrevTab,
    triggerGoToNextTab
  } = useTab({numTabs, activeTab})

  const navTabItems = []
  navTabItems.push(<button type="button" className="nav-link" {...triggerGoToPrevTab} role="tab">&lt;</button>)
  for (let i=1; i<=numTabs; i++) {
    navTabItems.push(<button type="button" className={`nav-link ${currentTab===i ? 'active' : ''}`} onClick={() => goToTab(i)} role="tab" aria-controls={`nav-${i}`} aria-selected={currentTab === i}>tab {i}</button>)
  }
  navTabItems.push(<button type="button" className="nav-link" {...triggerGoToNextTab} role="tab">&gt;</button>)

  const tabPaneItems = []
  for (let i=1; i<=numTabs; i++) {
    tabPaneItems.push(<div className={`tab-pane ${currentTab===i ? 'active' : ''}`} role="tabpanel" aria-labelledby={`nav-${i}-tab`}>
      <p><strong>Content Tab {i}</strong><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Mauris tempor efficitur enim et euismod. Etiam quam orci,
      interdum nec tristique nec, hendrerit nec turpis. Vestibulum
      finibus auctor nibh id mattis. Curabitur facilisis eros est,
      non pharetra tellus semper et. Fusce et tincidunt justo.
      Morbi porta urna turpis, ac tristique mauris auctor nec.
      Donec eu tristique purus. Ut lobortis lacinia ante,
      aliquet placerat elit lobortis quis. Sed finibus, lectus id congue
      euismod, dolor mauris feugiat nulla, ac pellentesque augue leo
      vitae sem. Class aptent taciti sociosqu ad litora torquent per
      conubia nostra, per inceptos himenaeos. Aenean sollicitudin
      imperdiet aliquet.</p>
    </div>)
  }

  return (
    <div className="tabs-stepper">
      <nav>
        <div className="nav nav-tabs" role="tablist">
          {navTabItems}
        </div>
      </nav>
      <div className="tab-content">
        {tabPaneItems}
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'useTab',
  component: Simple,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
}

export default meta;