import React, { useEffect } from 'react';
import './builderHeader.theme.scss';
import BacktestHeader from './BuilderBacktest/BacktestHeader';
import { useDispatch, useSelector } from 'react-redux';

export default function BuilderHeader() {
  return (
    <div className="builder-header">
      <BacktestHeader />
    </div>
  );
}
