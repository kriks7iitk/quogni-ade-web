import React from 'react';
import SubNavigationButton from './SubNavigationButton';
import { useLeftPanelContext } from '../../Dashboard/DashboardContainer/LeftPanel/LeftPanelProvider';

export default function SubNavigation() {
  const { activeTab, setActiveTab } = useLeftPanelContext();
  const menuList = [
    {
      name: 'Marked events',
      link: 'saved-events',
      iconName: 'bookmark-square',
    },
    {
      name: 'Saved screens',
      link: 'saved-screens',
      iconName: 'screener',
    },
  ];
  console.log('active tab is');
  console.log(activeTab);

  return (
    <div className="sub-navigation-menu">
      {menuList.map((menu, index) => {
        return (
          <SubNavigationButton
            iconName={menu?.iconName}
            onClick={() => {
              setActiveTab(menu?.link);
            }}
            isSelected={menu?.link == activeTab}
          />
        );
      })}
    </div>
  );
}
