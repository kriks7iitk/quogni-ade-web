import React from 'react';
import './builderHeader.theme.scss';
import BacktestHeader from './BuilderBacktest/BacktestHeader';

export default function BuilderHeader() {
  return (
    <div className="builder-header">
      <BacktestHeader />
    </div>
  );
}
