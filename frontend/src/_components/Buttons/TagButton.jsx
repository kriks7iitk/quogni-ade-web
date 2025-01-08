import React, { useState } from 'react';

export default function TagButton({
  onClick,
  color,
  bgColor,
  size = 'm',
  tag = '',
  customClass = 'btn-check',
  borderColor = '',
  disabled = false,
  hoverOverColor,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className={`tag-btn ${size} ${customClass ? `${customClass}` : ''}`}
      type="button"
      style={{
        color: color ? `${color}` : 'var(--ps-dark-blue)',
        backgroundColor: bgColor ? `${bgColor}` : 'var(--ps-white-1)',
        borderColor: isHovered ? `var(--pg-green-bright)` : `${borderColor}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {tag}
    </button>
  );
}
