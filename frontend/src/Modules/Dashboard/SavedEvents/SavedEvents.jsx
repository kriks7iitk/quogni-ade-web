import React from 'react';
import './saved-event.theme.scss';
import SingleSelect from '../../../_components/Form/SingleSelect';
import MultiSelect from '../../../_components/Form/MultiSelect';
import newsData from '../newsData.json';
import SavedEventBlock from './SavedEventBlock';
import { camelCaseToNormal } from '../../../Utility/utility';

export default function SavedEvents() {
  return (
    <div className="saved-events">
      <div className="filters">
        <div className="time-filter-container">
          <span className="title">Time</span>
          <SingleSelect
            height={20}
            width={60}
            isSearchable={false}
            fontSize="xs"
            placeholder=""
          />
        </div>
      </div>
      <div className="saved-event-list">
        {Object.keys(savedData).map((key, index) => {
          const dateEvent = savedData[key];
          return (
            <div className="saved-event-dates-container">
              <span className="saved-event-dates">
                {camelCaseToNormal(key)}
              </span>
              <div className="list-container">
                {dateEvent?.map((events, index) => {
                  return (
                    <SavedEventBlock
                      key={index}
                      source={events?.source}
                      stockList={events?.stocks}
                      expectedSentiment={events?.sentiment}
                      marketMovement="Pending"
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const savedData = {
  today: [
    {
      author: '',
      title: 'Nykaa shares in focus as CEO for Nykaa Fashion unit resigns',
      description:
        'Nykaa shares have fallen 7.6 per cent in the past one month against a 1 per cent rise in the BSE 500 index.  Nuvama has a target price of Rs 205 for Nykaa. JM Financial finds the stock worth Rs 250.',
      url: 'https://www.businesstoday.in/markets/stocks/story/nykaa-shares-in-focus-as-ceo-for-nykaa-fashion-unit-resigns-456371-2024-12-06?utm_source=rssfeed',
      source: 'businesstoday',
      category: 'general',
      language: 'en',
      country: 'in',
      published_at: '2024-12-06 02:15:53.000000 UTC',
      industries: "['Apparel Retail', 'Internet Retail', 'Capital Markets']",
      stocks: ['NYKAA', 'JMFINANCIL'],
      related_categories: "['India', 'Stock Market']",
      sentiment: 'negative',
    },
    {
      author: '',
      title: 'Nykaa shares in focus as CEO for Nykaa Fashion unit resigns',
      description:
        'Nykaa shares have fallen 7.6 per cent in the past one month against a 1 per cent rise in the BSE 500 index.  Nuvama has a target price of Rs 205 for Nykaa. JM Financial finds the stock worth Rs 250.',
      url: 'https://www.businesstoday.in/markets/stocks/story/nykaa-shares-in-focus-as-ceo-for-nykaa-fashion-unit-resigns-456371-2024-12-06?utm_source=rssfeed',
      source: 'businesstoday',
      category: 'general',
      language: 'en',
      country: 'in',
      published_at: '2024-12-06 02:15:53.000000 UTC',
      industries: "['Apparel Retail', 'Internet Retail', 'Capital Markets']",
      stocks: ['NYKAA', 'JMFINANCIL'],
      related_categories: "['India', 'Stock Market']",
      sentiment: 'negative',
    },
  ],
  yesterday: [
    {
      author: '',
      title: 'Nykaa shares in focus as CEO for Nykaa Fashion unit resigns',
      description:
        'Nykaa shares have fallen 7.6 per cent in the past one month against a 1 per cent rise in the BSE 500 index.  Nuvama has a target price of Rs 205 for Nykaa. JM Financial finds the stock worth Rs 250.',
      url: 'https://www.businesstoday.in/markets/stocks/story/nykaa-shares-in-focus-as-ceo-for-nykaa-fashion-unit-resigns-456371-2024-12-06?utm_source=rssfeed',
      source: 'businesstoday',
      category: 'general',
      language: 'en',
      country: 'in',
      published_at: '2024-12-06 02:15:53.000000 UTC',
      industries: "['Apparel Retail', 'Internet Retail', 'Capital Markets']",
      stocks: ['NYKAA', 'JMFINANCIL'],
      related_categories: "['India', 'Stock Market']",
      sentiment: 'negative',
    },
  ],
};