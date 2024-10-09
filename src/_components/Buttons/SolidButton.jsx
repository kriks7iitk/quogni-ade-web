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
  hoverIconFill
}) => {

  const [isHovered, setIsHovered] = useState(false);
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
      className={`flex items-center bg-${color}-500 text-white rounded ${getSizeClass()} ${className} hover:bg-${color}-600 transition-all duration-300`}
      disabled={disabled}
      type="button"
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      {leftIcon && (
        <Icon
        className="ml-2 transition-colors duration-300"
          name={leftIcon}
          width={iconWidth}
          fill={isHovered ? hoverIconFill : iconFill}
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
