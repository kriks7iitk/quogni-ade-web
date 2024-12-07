import React from 'react';
import '../../feed-container.theme.scss';
import EventInsightContainer from './EventInsightContainer';

export default function EventList() {
    return (
        <div className='feed-event-list'>
            event-list
            <EventInsightContainer></EventInsightContainer>
            <EventInsightContainer></EventInsightContainer>
        </div>
    )
}