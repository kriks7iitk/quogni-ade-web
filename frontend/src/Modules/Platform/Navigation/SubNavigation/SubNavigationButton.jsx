import React from 'react';
import Icon from '../../../../_icons/svgs/SolidIcons';
import SolidButton from '../../../../_components/Buttons/SolidButton';
import '../navigation.theme.scss';

export default function SubNavigationButton({
  iconName,
  onClick,
  onHover,
  isSelected,
  disable,
}) {

  return (
    <div className='button-container'>
      <SolidButton
        leftIcon={iconName}
        hoverIconFill='white'
        iconWidth="25"
        customClass="sub-navigation-button"
        size="xs"
        onClick={onClick}
        iconFill={'var(--slate-400)'}
        isActive={isSelected}
        iconStroke={isSelected ? '2' : '1.5'}
      />
    </div>
  );
}
