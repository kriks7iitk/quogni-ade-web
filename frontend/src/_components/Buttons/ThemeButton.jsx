import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../_icons/svgs/SolidIcons';
import SolidThemeIcon from '../../_icons/svgs/SolidThemeIcons';

const ThemeButton = ({
  children,
  onClick,
  size = 'medium',
  className = '',
  disabled = false,
  leftIcon,
  iconWidth,
  iconFill,
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'py-1 px-2 text-sm';
      case 'large':
        return 'py-2 px-4 text-lg';
      default:
        return 'py-1.5 px-3 text-base';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center bg-transparent border-none text-white ${getSizeClass()} ${className}`}
      disabled={disabled}
      type="button"
    >
      {leftIcon && (
        <SolidThemeIcon
          className="mr-2"
          name={leftIcon}
          width={iconWidth}
          fill={disabled ? 'var(--slate-300)' : iconFill}
        />
      )}
      {children}
    </button>
  );
};

ThemeButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  iconWidth: PropTypes.string,
  iconFill: PropTypes.string,
  leftIcon: PropTypes.string,
};

export default ThemeButton;
