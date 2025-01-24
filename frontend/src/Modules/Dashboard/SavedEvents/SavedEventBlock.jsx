import React from 'react';
import SolidThemeIcon from '../../../_icons/svgs/SolidThemeIcons';
import StockButton from '../../../_components/Buttons/StockButton';
import ThemeButton from '../../../_components/Buttons/ThemeButton';

export default function SavedEventBlock({
  stockList = [],
  expectedSentiment,
  source,
  marketMovement,
  onDelete,
}) {
  const sentimentSymbol = (type) => {
    const iconMap = {
      positive: 'positive-up',
      negative: 'negative-down',
      neutral: 'neutral-dash',
    };
    return <SolidThemeIcon name={iconMap[type]} />;
  };
  const eventSentiment = (sentimentType) => {
    return (
      <div className="sentiment-symbol">{sentimentSymbol(sentimentType)}</div>
    );
  };
  return (
    <div className="saved-event-block">
      <div className="event-detail">
        <div className="event-source">{source}</div>
        <div className="predicted-sentiment">
          {eventSentiment(expectedSentiment)}
        </div>
        <div className="market-movement">{marketMovement}</div>
        <div className="delete">
          <ThemeButton leftIcon="delete" />
        </div>
      </div>
      <div className="securities-list">
        {stockList.map((stock) => {
          return (
            <StockButton symbol={stock} percentageChange="2" direction="up" />
          );
        })}
      </div>
    </div>
  );
}
