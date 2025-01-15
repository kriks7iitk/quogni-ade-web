import React from 'react';
import './button.theme.scss';
import SolidThemeIcon from '../../_icons/svgs/SolidThemeIcons';

export default function StockButton({
  direction,
  percentageChange,
  symbol,
  size = 'xs',
  customClass,
  active = false,
  showChangeSymbol,
}) {
  const colorCode = {
    up: 'var(--green-300)',
    down: 'var(--red-500)',
  };

  const directionSymbol = (direction) => {
    const iconDirection = {
      up: 'positive-up',
      down: 'negative-down',
    };

    const iconSize = {
      xxs: 5,
      xs: 10,
      s: 15,
      m: 20,
      l: 25,
    };
    return (
      <SolidThemeIcon
        name={iconDirection[direction]}
        width={iconSize[size]}
        fill={colorCode[direction]}
      />
    );
  };
  return (
    <div className={`stock-btn ${size} ${customClass ? `${customClass}` : ''}`}>
      {symbol}
      {direction && (
        <div className="direction-arrow">
          {showChangeSymbol && directionSymbol(direction)}
        </div>
      )}
      {percentageChange && (
        <span style={{ color: colorCode[direction] }}>{percentageChange}%</span>
      )}
    </div>
  );
}
