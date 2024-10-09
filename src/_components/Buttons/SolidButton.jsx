import React, {useState} from 'react';
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
  hoverIconFill,
  isActive,
}) => {

  const [isHovered, setIsHovered] = useState(false);
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'py-1 px-2 text-sm';
      case 'large':
        return 'py-2 px-4 text-lg';
      default:
        return 'py-1 px-2 text-base'; // Medium size
    }
  };
 

  const getHoverOrActiveClass = () => {
    // This function applies the same classes used for hover and active state
    return `hover:bg-${color}-600 ${
      isActive ? `bg-${color}-600` : ''
    }`; // If active, apply hover styles
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center rounded ${getSizeClass()} ${className} 
        bg-${color}-500 text-white transition-all duration-300 ${getHoverOrActiveClass()} ${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
      type="button"
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      {leftIcon && (
        <Icon
        className="ml-2 transition-colors duration-300"
          name={leftIcon}
          width={iconWidth}
          fill={isHovered? hoverIconFill : iconFill}
        />
      )}
      {children}
      {rightIcon && (
        <Icon
        className=" transition-colors duration-300"
          name={rightIcon}
          width={iconWidth}
          fill={isHovered? hoverIconFill : iconFill}
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
