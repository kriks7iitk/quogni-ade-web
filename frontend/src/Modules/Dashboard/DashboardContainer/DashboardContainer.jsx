import React from 'react';
import './dashboard-container.theme.scss';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import FeedContainer from '../FeedContainer/FeedContainer';

export default function DashboardContainer() {
    return (
        <div className='dashboard-container'>
            <LeftSidebar></LeftSidebar>
            <FeedContainer></FeedContainer>
        </div>
    );
}