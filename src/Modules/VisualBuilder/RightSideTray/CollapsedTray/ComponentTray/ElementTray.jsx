import React from 'react';
import { TrayElementButton } from './TrayBtn/TrayElementButton';

export default function ElementTray() {
  const trayItems = [
    { name: 'Candle', type: 'candle' },
    { name: 'Line', type: 'line' },
    { name: 'Volume', type: 'volume' },
  ];
  return (
    <div className="tray-pane absolute flex-col top-0.5 justify-center items-center ">
      {trayItems.map((item, index) => (
        <TrayElementButton key={index} type={item?.type} name={item?.name} />
      ))}
    </div>
  );
}
