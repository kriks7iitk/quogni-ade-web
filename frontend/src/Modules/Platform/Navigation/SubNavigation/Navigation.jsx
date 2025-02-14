import React, { useEffect } from 'react';
import SubNavigationButton from './SubNavigationButton';
import { usePlatform } from '../../PlatformLayout';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {

  
  
  const { activeTab, setActiveTab } = usePlatform();
  const navigate = useNavigate();
  const menuList = [
    {
      name: 'Tools',
      link: '/workspace/tools',
      iconName: 'tools',
    },
    {
      name: 'Agents',
      link: '/workspace/agents',
      iconName: 'agents',
    },
    
  ];

  useEffect(() => {
    console.log("active tab is changes");
    console.log(activeTab);
    
  
  }, [activeTab])

  const bottomNavigation = [
    {
      name: 'Settings',
      link: 'setting',
      iconName: 'setting',
    },
  ];
  return (
    <div className='sub-navigation'>
      <div className='logo'></div>
      <div className="sub-navigation-menu">
        {menuList.map((menu, index) => {
          return (
            <SubNavigationButton
            key={index}
              iconName={menu?.iconName}
              onClick={() => {
                console.log("this is clicked");
                
                setActiveTab(menu?.link);
                navigate(menu.link);
              }}
              isSelected={location.pathname === menu.link}
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
                console.log("this is clicked");
                setActiveTab(menu?.link);
                navigate(menu.link);
              }}
              isSelected={location.pathname === menu.link}
            />
          );
        })}
      </div>
    </div>
  );
}
