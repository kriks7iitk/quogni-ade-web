import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../_icons/svgs/SolidIcons';
import './button.theme.scss';

const SolidButton = ({
  children,
  onClick,
  color,
  bgColor,
  size = 'm',
  customClass = 'btn-check',
  borderColor = '',
  disabled = false,
  leftIcon,
  iconWidth,
  iconFill,
  rightIcon,
  hoverIconFill,
  hoverOverColor,
  isActive,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className={`ps-btn ${size} ${customClass ? `${customClass}` : ''}`}
      type="button"
      style={{
        color: disabled
          ? 'var(--slate-400)'
          : color
            ? `${color}`
            : 'var(--ps-dark-blue)',
        backgroundColor: disabled
          ? 'var(--slate-200)'
          : bgColor
            ? `${bgColor}`
            : 'var(--ps-white-1)',
        borderColor: `${borderColor}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {leftIcon && (
        <Icon
          className="ml-2 transition-colors duration-300"
          name={leftIcon}
          width={iconWidth}
          fill={isHovered && !isActive ? hoverIconFill : iconFill}
        />
      )}
      {children}
      {rightIcon && (
        <Icon
          className=" transition-colors duration-300"
          name={rightIcon}
          width={iconWidth}
          fill={isHovered ? hoverIconFill : iconFill}
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
  hoverIconFill: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
};

export default SolidButton;
