import React, { useEffect } from 'react';
import '../../feed-container.theme.scss';
import TagButton from '../../../../../_components/Buttons/TagButton';
import SolidThemeIcon from '../../../../../_icons/svgs/SolidThemeIcons';
import StockButton from '../../../../../_components/Buttons/StockButton';

export default function EventInsightContainer({
  title,
  date,
  source,
  industries = [],
  sentiment,
  stocks = [],
}) {
  useEffect(() => {
    console.log('hello how are you');
    console.log(sentiment);
  }, [sentiment]);

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
      <div className="sentiment-section">
        <span>{sentimentType.toUpperCase()}</span>{' '}
        <div className="sentiment-symbol">{sentimentSymbol(sentimentType)}</div>
      </div>
    );
  };

  return (
    <div className="feed-event-container">
      <div className="header-section">
        <div className="sector-list">
          {industries?.map((ind) => (
            <TagButton
              key={ind.id || ind} // Replace with a unique property
              tag={ind}
              size="xs"
              color={'var(--ps-dark-blue)'}
              bgColor={'var(--ps-green-bright)'}
            />
          ))}
        </div>
        {eventSentiment(sentiment)}
      </div>
      <div className="event-title">{title}</div>
      <div className="securities-section">
        <div className="header-sec">Affected</div>
        <div className="securities-tag">
          {stocks?.map((ind) => (
            <StockButton
              symbol={ind}
              direction={sentiment === 'negative' ? 'down' : 'up'}
              showChangeSymbol={false}
              percentageChange="2.0"
            />
          ))}
        </div>
      </div>
      <div className="footer-section">
        <div className="source-field">{source}</div>
        <div className="date-field">{date}</div>
      </div>
    </div>
  );
}
