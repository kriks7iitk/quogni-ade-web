import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../_icons/svgs/SolidIcons';

const SolidButton = ({
  children,
  onClick,
  color = 'white',
  size = 'medium',
  className = '',
  disabled = false,
  leftIcon,
  iconWidth,
  iconFill,
  rightIcon,
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'py-1 px-2 text-sm';
      case 'large':
        return 'py-2 px-4 text-lg';
      default:
        return 'py-1.5 px-3 text-base'; // Medium size
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center bg-${color}-500 text-white rounded ${getSizeClass()} ${className}`}
      disabled={disabled}
      type="button"
    >
      {leftIcon && (
        <Icon
          className="mr-2"
          name={leftIcon}
          width={iconWidth}
          fill={iconFill}
        />
      )}
      {children}
      {rightIcon && (
        <Icon
          className="ml-2"
          name={rightIcon}
          width={iconWidth}
          fill={iconFill}
        />
      )}
    </button>
  );
};

SolidButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  iconWidth: PropTypes.string,
  iconFill: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
};

export default SolidButton;
