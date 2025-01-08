import React from 'react';
import './feed-container.theme.scss';
import CopilotSearch from './components/copilot-search/CopilotSearch';
import EventList from './components/event-list/EventList';

export default function FeedContainer() {
    return (
        <div className='feed-container'>
            <CopilotSearch></CopilotSearch>
            <EventList></EventList>
        </div>
    )
}