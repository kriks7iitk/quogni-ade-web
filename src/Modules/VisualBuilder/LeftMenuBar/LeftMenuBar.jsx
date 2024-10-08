import React, { useContext } from 'react';
import './leftMenu.theme.scss';
import SolidButton from '../../../_components/Buttons/SolidButton';
import { VisualBuilderContext } from '../VisualBuilder';

export default function LeftMenuBar() {
  const { setExpandSideTray, setSubRoute } = useContext(VisualBuilderContext);
  return (
    <div className="left-menu">
      <div className="header-btn-container">
        <SolidButton
          leftIcon="builder"
          iconWidth={20}
          className="header-button"
          iconFill="#0B1644"
          onClick={() => {
            setSubRoute('builder');
            setExpandSideTray(false);
          }}
        />
      </div>
      <div className="navigation-list">
        <SolidButton
          leftIcon="wrench"
          iconWidth={17}
          className="header-button"
          iconFill="#0B1644"
        />
        <SolidButton
          leftIcon="line-chart"
          iconWidth={18}
          className="header-button"
          iconFill="#0B1644"
        />
        <SolidButton
          leftIcon="filter"
          iconWidth={18}
          className="header-button"
          iconFill="#0B1644"
        />

        <SolidButton
          leftIcon="back-test"
          iconWidth={23}
          className="header-button"
          iconFill="#0B1644"
          onClick={() => {
            setSubRoute('back-test');
            setExpandSideTray(true);
          }}
        />
        <SolidButton
          leftIcon="performance"
          iconWidth={22}
          className="header-button"
          iconFill="#0B1644"
        />

        <SolidButton
          leftIcon="setting"
          iconWidth={20}
          className="header-button"
          iconFill="#0B1644"
        />
      </div>
    </div>
  );
}
