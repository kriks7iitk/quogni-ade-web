import React from 'react';
import Icon from '../../../_icons/svgs/SolidIcons';
import SolidButton from '../../../_components/Buttons/SolidButton';
import '../navigation.theme.scss';

export default function SubNavigationButton({
  iconName,
  onClick,
  onHover,
  isSelected,
  disable,
}) {
  console.log(isSelected);

  return (
    <div>
      <SolidButton
        leftIcon={iconName}
        iconWidth="20"
        customClass="sub-navigation-button"
        size="xs"
        onClick={onClick}
        iconFill={isSelected ? 'var(--ps-dark-blue)' : 'var(--ps-green-bright)'}
      />
    </div>
  );
}
