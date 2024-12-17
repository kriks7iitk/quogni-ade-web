import React, { useEffect } from 'react';
import StrategyItem from './StrategyItem';
import '../BackTest/back-test.theme.scss';
import { useSelector, useDispatch } from 'react-redux';
import Performance from './Performance';
import { fetchStrategyName } from '../../../_stores/right-drawer.reducer';

export default function BackTestTray() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.rightDrawerData.data);
  const loading = useSelector((state) => state.rightDrawerData.loading);
  const strategiesList = useSelector(
    (state) => state.rightDrawerData.data?.strategyList,
  );
  const level = useSelector((state) => state.rightDrawerData.level);
  const showBackButton = useSelector(
    (state) => state.rightDrawerData.showBackButton,
  );

  const strategyList = [
    { name: 'strategy1', id: 1 },
    { name: 'strategy2', id: 2 },
  ];
  return (
    <div className="back-test-tray">
      {!loading ? (
        (() => {
          switch (level) {
            case 'back-test-performance':
              return <Performance />;
            default:
              return strategiesList ? (
                strategiesList.map((item, index) => (
                  <div
                    key={item.id}
                    id="expanded-tray"
                    className="strategy-full-item"
                  >
                    <div className="strategy-ser">{index + 1}</div>
                    <StrategyItem name={item.strategy} id={index} />
                  </div>
                ))
              ) : (
                <div></div>
              );
          }
        })() // Immediately invoked function expression (IIFE)
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
