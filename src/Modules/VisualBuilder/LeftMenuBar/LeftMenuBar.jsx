import React,{ useContext }  from 'react';
import './leftMenu.theme.scss';
import SolidButton from '../../../_components/Buttons/SolidButton';
import { Tooltip } from 'react-tooltip';
import { NavLink, Routes, Route, BrowserRouter } from 'react-router-dom';
import { VisualBuilderContext } from '../VisualBuilder';

export default function LeftMenuBar() {
  const { setExpandSideTray, setSubRoute } = useContext(VisualBuilderContext);
  return (
      <div className="left-menu">
        <div className="header-btn-container">
          <a id="builder-anchor" className="flex justify-center items-center">
            <NavLink
              to="builder"
              className={({ isActive }) =>
                `flex justify-center items-center ${isActive ? 'active-tab' : ''}`
              }
            >
              <SolidButton
                leftIcon="builder"
                iconWidth={20}
                className="header-button hover:bg-[#000050]"
                // iconFill="#0B1644"
                iconFill="#EE7071"
                hoverIconFill="#EE7071"
                onClick={() => {
                  setSubRoute('builder');
                  setExpandSideTray(false);
                }}
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
          <a id="indicators">
            <NavLink
              to="indicators"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active-tab' : ''}`
              }
            >
              <SolidButton
                leftIcon="wrench"
                iconWidth={15}
                className="header-button hover:bg-[#000050]"
                iconFill="#0B1644"
                hoverIconFill="#CAFC99"
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

          <a id="line-chart-anchor">
          <NavLink
              to="line-chart"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active-tab' : ''}`
              }
            >
            <SolidButton
              leftIcon="line-chart"
              iconWidth={18}
              className="header-button hover:bg-[#000050] "
              iconFill="#0B1644"
            />
            </NavLink>
          </a>
          <Tooltip
            anchorSelect="#line-chart-anchor"
            content="Line Chart"
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
              iconWidth={18}
              className="header-button hover:bg-[#000050] "
              iconFill="#0B1644"
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
              iconWidth={23}
              className="header-button hover:bg-[#000050] "
              iconFill="#0B1644"
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
              iconWidth={22}
              className="header-button hover:bg-[#000050] "
              iconFill="#0B1644"
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
              to="performance"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active-tab' : ''}`
              }
              >
            
            <SolidButton
              leftIcon="setting"
              iconWidth={20}
              className="header-button hover:bg-[#000050] "
              iconFill="#0B1644"
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
