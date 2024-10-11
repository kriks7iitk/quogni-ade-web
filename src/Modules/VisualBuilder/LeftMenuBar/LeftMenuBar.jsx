import React,{ useContext, useEffect }  from 'react';
import './leftMenu.theme.scss';
import SolidButton from '../../../_components/Buttons/SolidButton';
import { Tooltip } from 'react-tooltip';
import { NavLink, Routes, Route, BrowserRouter } from 'react-router-dom';
import { VisualBuilderContext } from '../VisualBuilder';
import { InspectorContext } from '../_contexts/InspectorProvider';

export default function LeftMenuBar() {
  const { setExpandSideTray,setDrawerOpen, setSubRoute, subRoute, setTabs, setIsCollapsed } = useContext(VisualBuilderContext);
  const COLLAPSED_HEIGHT = 51;


  const isActiveSubRoute = (route) => subRoute === route;

  useEffect(() => {
    if (subRoute !== 'back-test') {
      setExpandSideTray(false);

    }
  }, [subRoute]);
  return (
      <div className="left-menu">
        <div className="header-btn-container">
          <a id="builder-anchor" className="flex justify-center items-center">
            <NavLink
              to="/builder"
              className={({ isActive }) =>
                `flex justify-center items-center ${isActive ? 'active-tab' : ''}`
              }
            >
              <SolidButton
                leftIcon="builder"
                iconWidth={20}
                className="hover:bg-[#000050] bg-green-900/20 h-10 w-8"
                // iconFill="#0B1644"
                iconFill="#EE7071"
                hoverIconFill="#EE7071"
                isActive={isActiveSubRoute('builder')}
                
              />
            </NavLink>
          </a>
          <Tooltip
            anchorSelect="#builder-anchor"
            content="Builder"
            place="right"
            effect="solid"
            style={{ zIndex: 9999 }}
          />
        </div>

        <div className="navigation-list">
          <a id="builder">
            <NavLink
              to="/builder"
            >
              <SolidButton
                leftIcon="wrench"
                iconWidth={20}
                className={`${isActiveSubRoute('builder')?'bg-[#000050]':''} h-10 w-8 hover:bg-[#000050]`}
                iconFill={isActiveSubRoute('builder')?'#CAFC99':'#0B1644'}
                hoverIconFill="#CAFC99"
                
                onClick={() => {
                  setSubRoute('builder');
                  setDrawerOpen(true);
                  setTabs([]);
                  setIsCollapsed(true);
                  setInspectorHeight(COLLAPSED_HEIGHT);
                }}
              />
            </NavLink>
          </a>
          <Tooltip
            anchorSelect="#builder"
            content="Builder"
            place="right"
            effect="solid"
            style={{ zIndex: 9999 }}
          />

          <a id="indicators">
          <NavLink
              to="indicators"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active-tab' : ''}`
              }
            >
            <SolidButton
              leftIcon="line-chart"
              iconWidth={24}
              className={`${isActiveSubRoute('indicators')?'bg-[#000050]':''} h-10 w-8 hover:bg-[#000050]`}
                iconFill={isActiveSubRoute('indicators')?'#CAFC99':'#0B1644'}
              onClick={() => {
                setSubRoute('indicators');
                setDrawerOpen(true);
              }}
            />
            </NavLink>
          </a>
          <Tooltip
            anchorSelect="#indicators"
            content="Indicators"
            place="right"
            effect="solid"
            style={{ zIndex: 9999 }}
          />

          <a id="filter">
          <NavLink
              to="filter"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active-tab' : ''}`
              }
            >
            <SolidButton
              leftIcon="filter"
              iconWidth={24}
              className={`${isActiveSubRoute('filter')?'bg-[#000050]':''} h-10 w-8 hover:bg-[#000050]`}
                iconFill={isActiveSubRoute('filter')?'#CAFC99':'#0B1644'}
              onClick={() => {
                setSubRoute('filter');
                
                setDrawerOpen(true);
              }}
            />
            </NavLink>
          </a>
          <Tooltip
            anchorSelect="#filter"
            content="Filter"
            place="right"
            effect="solid"
            style={{ zIndex: 9999 }}
          />

          <a id="backtest">
          <NavLink
              to="back-test"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active-tab' : ''}`
              }
            >
            <SolidButton
              leftIcon="back-test"
              iconWidth={24}
              className={`${isActiveSubRoute('back-test')?'bg-[#000050]':''} h-10 w-8 hover:bg-[#000050]`}
                iconFill={isActiveSubRoute('back-test')?'#CAFC99':'#0B1644'}
              onClick={() => {
               setSubRoute('back-test');
                setExpandSideTray(true);
              }}
            />
            </NavLink>
          </a>
          <Tooltip
            anchorSelect="#backtest"
            content="Back Test"
            place="right"
            effect="solid"
            style={{ zIndex: 9999 }}
          />

          <a id="performance">
            <NavLink
              to="performance"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active-tab' : ''}`
              }
              >
            <SolidButton
              leftIcon="performance"
              iconWidth={24}
              className={`${isActiveSubRoute('performance')?'bg-[#000050]':''} h-10 w-8 hover:bg-[#000050]`}
                iconFill={isActiveSubRoute('performance')?'#CAFC99':'#0B1644'}
              onClick={() => {
                setSubRoute('performance');
                setDrawerOpen(true);
              }}
            />
            </NavLink>
          </a>
          <Tooltip
            anchorSelect="#performance"
            content="Performance"
            place="right"
            effect="solid"
            style={{ zIndex: 9999 }}
          />

          <a id="strategysettings">
          <NavLink
              to="settings"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active-tab' : ''}`
              }
              >
            
            <SolidButton
              leftIcon="setting"
              iconWidth={24}
              className={`${isActiveSubRoute('settings')?'bg-[#000050]':''} h-10 w-8 hover:bg-[#000050]`}
                iconFill={isActiveSubRoute('settings')?'#CAFC99':'#0B1644'}
              onClick={() => {
                setSubRoute('settings');
                setDrawerOpen(true);
              }}
            />
            </NavLink>
          </a>
          <Tooltip
            anchorSelect="#strategysettings"
            content="Strategy Settings"
            place="right"
            effect="solid"
            style={{ zIndex: 9999 }}
          />
        </div>
      </div>
  );
}
