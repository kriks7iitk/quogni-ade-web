import React from 'react';
import StrategyItem from './StrategyItem';
import '../BackTest/back-test.theme.scss';

export default function BackTestTray() {
  const strategyList = [
    { name: 'strategy1', id: 1 },
    { name: 'strategy2', id: 2 },
  ];
  return (
    <div className="back-test-tray">
      {strategyList.map((item) => {
        return (
          <div className="strategy-full-item">
            <div className="strategy-ser">{item.id}</div>
            <StrategyItem name={item.name} id={item.id} />
          </div>
        );
      })}
    </div>
  );
}
