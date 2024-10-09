import React from 'react';
import { TrayElementButton } from './TrayBtn/TrayElementButton';

export default function ElementTray() {
  const trayItems = [
    { name: 'Candle', type: 'candle' },
    { name: 'Line', type: 'line' },
    { name: 'Volume', type: 'volume' },
  ];
  return (
    <div className="tray-pane">
      {trayItems.map((item, index) => (
        <TrayElementButton key={index} type={item?.type} name={item?.name} />
      ))}
    </div>
  );
}
