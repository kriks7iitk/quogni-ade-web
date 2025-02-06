import React from 'react';
import SubNavigationButton from './SubNavigationButton';
import { useLeftPanelContext } from '../../LeftPanel/LeftPanelProvider';
import SolidButton from '../../../_components/Buttons/SolidButton';

export default function SubNavigation() {
  const { activeTab, setActiveTab } = useLeftPanelContext();
  const menuList = [
    {
      name: 'Dashboard',
      link: 'all-servers',
      iconName: 'dashboard',
    },
    
  ];

  const bottomNavigation = [
    {
      name: 'Settings',
      link: 'setting',
      iconName: 'setting',
    },
  ];

  return (
    <div className='sub-navigation'>
      <div className="sub-navigation-menu">
        <div className='logo'>
            <SolidButton leftIcon='piggie-white' iconWidth='23' customClass='sub-navigation-button' size="s" iconFill='var(--ps-white-1)'/>
        </div>
        {menuList.map((menu, index) => {
          return (
            <SubNavigationButton
            key={index}
              iconName={menu?.iconName}
              onClick={() => {
                setActiveTab(menu?.link);
              }}
              isSelected={menu?.link == activeTab}
            />
          );
        })}
      </div>
      <div className='navigation-bottom'>
      {bottomNavigation.map((menu, index) => {
          return (
            <SubNavigationButton
            key={index}
              iconName={menu?.iconName}
              onClick={() => {
                setActiveTab(menu?.link);
              }}
              isSelected={menu?.link == activeTab}
            />
          );
        })}
      </div>
    </div>
  );
}
