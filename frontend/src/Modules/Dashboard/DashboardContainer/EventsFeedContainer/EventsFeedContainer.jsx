import React from 'react';
import './feed-container.theme.scss';
import EventList from './EventList';

export default function EventsFeedContainer() {
  return (
    <div className="feed-container">
      <EventList></EventList>
    </div>
  );
}
