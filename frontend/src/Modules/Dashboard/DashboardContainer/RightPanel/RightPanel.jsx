import React from 'react';
import './right-panel.theme.scss';
import UpdatesBoard from './UpdatesBoard';
import EventsFeedRightContainer from './EventsFeedRightContainer';

export default function RightPanel() {
  return (
    <div className="right-panel">
      <UpdatesBoard />
      <EventsFeedRightContainer />
    </div>
  );
}
