import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Performance() {
  const performanceSignal = useSelector(
    (state) => state.rightDrawerData.data?.signalData,
  );

  const selectedStock = useSelector(
    (state) => state.rightDrawerData.selectedStock,
  );

  const { performance: performance2, singals } = performanceSignal;
  const dispatch = useDispatch();

  console.log('singal is ');
  console.log(performanceSignal);

  const signal = singals.map((item) => {
    return {
      date: new Date(item.Date),
      price: Math.round(item.Open * 10) / 10,
      position: item.Position?.toUpperCase(),
    };
  });

  const performance = {
    strategyName: performance2[0]['strategy'],
    net_profit_loss: `${performance2[0]['net_perc_pnl']}`,
    risk_reward_ratio: `${performance2[0]['risk_reward_ratio']}`,
    total_trades: performance2[0]['total_trades'],
    total_winners: performance2[0]['total_winners'],
    total_looser: performance2[0]['total_losers'],
  };

  const signalColor = (position) => {
    switch (position) {
      case 'SELL':
        return {
          color: 'var(--ps-pink)',
        };

      default:
        return {
          color: 'var(--ps-dark-blue)',
        };
        break;
    }
  };
  return (
    <div className="performance-metric">
      <div className="stock-symbol">
        <div className="stock-name-head">Stock:</div>
        <div className="stock-name">{selectedStock}</div>
      </div>
      <div className="performance-table">
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid var(--ps-dark-blue)',
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  textAlign: 'left',
                  fontSize: '14px',
                  color: 'var(--ps-dark-blue)',
                }}
              >
                Metric
              </th>
              <th
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  textAlign: 'left',
                  fontSize: '14px',
                  color: 'var(--ps-dark-blue)',
                }}
              >
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(performance).map(([key, value], index) => (
              <tr key={index}>
                <td
                  style={{
                    border: '1px solid #ddd',
                    padding: '8px',
                    fontSize: '12px',
                    fontWeight: '500',
                    borderBottom: '2px solid var(--ps-dark-blue)',
                  }}
                >
                  {key
                    .replace(/_/g, ' ')
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </td>
                <td
                  style={{
                    border: '1px solid #ddd',
                    padding: '8px',
                    fontSize: '12px',
                  }}
                >
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="signals-list-container">
        <div className="signals-header">
          Signals<div className="signal-count">{`count(${signal.length})`}</div>
        </div>
        <div className="signal-list">
          {signal &&
            signal.map((item, index) => {
              const formattedDate = new Intl.DateTimeFormat('en-GB', {
                day: '2-digit',
                month: 'long',
                year: '2-digit',
              }).format(item.date);
              return (
                <div key={index} className="signal-item">
                  <div className="date">{formattedDate}</div>
                  <div className="position" style={signalColor(item.position)}>
                    {item.position}
                  </div>
                  <div className="price">{`Rs ${item.price}`}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
