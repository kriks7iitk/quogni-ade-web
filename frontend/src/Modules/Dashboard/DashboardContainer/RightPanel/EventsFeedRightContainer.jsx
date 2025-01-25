import React, { useState } from 'react';
import ResizableContainer from '../../../../_components/Containers/ResizableContainer';
import { useDashboard } from '../DashboardContainer';
import EventsFeedContainer from '../EventsFeedContainer/EventsFeedContainer';

export default function EventsFeedRightContainer() {
  const { aiMode } = useDashboard();

  return (
    <ResizableContainer
      customClass="event-feeds-right"
      title="Events feeds"
      maximizeHeightInPercentage="50"
    >
      {true && <EventsFeedContainer />}
    </ResizableContainer>
  );
}
