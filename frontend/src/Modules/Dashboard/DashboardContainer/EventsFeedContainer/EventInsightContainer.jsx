import React, { useEffect } from 'react';
import './feed-container.theme.scss';
import TagButton from '../../../../_components/Buttons/TagButton';
import SolidThemeIcon from '../../../../_icons/svgs/SolidThemeIcons';
import StockButton from '../../../../_components/Buttons/StockButton';
import SolidButton from '../../../../_components/Buttons/SolidButton';
import { useDashboard } from '../DashboardContainer';
import ThemeButton from '../../../../_components/Buttons/ThemeButton';
import toast from 'react-hot-toast';

export default function EventInsightContainer({
  id,
  title,
  date,
  source,
  industries = [],
  sentiment,
  stocks = [],
  description
}) {
  useEffect(() => {}, [sentiment]);

  const {
    setCurrentActiveAgent,
    currentActiveAgent,
    selectedEvent,
    setSelectedEvent,
    setSelectedStock,
    selectedStock,
    setPlaceHolder
  } = useDashboard();

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

  const isActive = currentActiveAgent === 'event-agent' && id === selectedEvent?.id;

  return (
    <div className="feed-event-container">
      <div className="header-section">
        <div className="sector-list">
          {industries?.map((ind, index) => (
            <TagButton
              key={index} // Replace with a unique property
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
      <div className="pre-footer">
        <div className="securities-section">
          <div className="header-sec">Affected</div>
          <div className="securities-tag">
            {stocks?.map((ind, index) => (
              <StockButton
                key={index}
                symbol={ind}
                customClass={selectedStock === ind ? 'selected-stock' : ''}
                direction={sentiment === 'negative' ? 'down' : 'up'}
                showChangeSymbol={false}
                percentageChange="2.0"
                onClick={() => {
                  if (selectedStock === ind) {
                    if(currentActiveAgent==='event-agent'){
                      setPlaceHolder("Ask anything regarding this event")
                    }
                    else if(currentActiveAgent==='data-insight-agent'){
                      toast.error("Stock need to be selected for this agent")
                      return;
                    }
                    else{
                      setPlaceHolder('Ask finance to our AI')
                    }
                   
                    setSelectedStock(null);
                    return;
                  }
                  if(currentActiveAgent==='event-agent'){
                    setPlaceHolder("Ask anything regarding this event from our event agent for given stock")
                  }
                  else if(currentActiveAgent==='data-insight-agent'){
                    setPlaceHolder("Ask anything 'report insight agent' for the choosen stock")
                  }
                  
                  setSelectedStock(ind);
                }}
              />
            ))}
          </div>
        </div>
        <div className="agent-button">
          <SolidButton
            leftIcon="event-agent"
            iconWidth={15}
            customClass="icon-class"
            iconFill={isActive ? 'var(--ps-green-bright)' : 'var(--slate-600)'}
            onClick={() => {
              setSelectedEvent({id,selectedStock,sentiment, title,description,sentiment});
              if (isActive) {
                setCurrentActiveAgent('');
                setSelectedEvent(null);
                setPlaceHolder("Ask anything finance from our AI")
                return;
              }
              setPlaceHolder("Ask for insight regarding this event from our event agent")
              setCurrentActiveAgent('event-agent');
            }}
            isActive={isActive}
          />
        </div>
      </div>

      <div className="footer-section">
        <div className="source-field">{source}</div>
        <div className="footer-right-sec">
          <div className="date-field">{date}</div>
          <ThemeButton
            leftIcon="plus"
            className="add-btn"
            iconFill="var(--slate-300)"
            iconWidth="18"
          />
        </div>
      </div>
    </div>
  );
}
