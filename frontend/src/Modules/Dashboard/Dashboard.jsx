import React from 'react';
import DashboardHeader from './DashboardHeader/DashboardHeader';
import './dashboard.theme.scss';
import DashboardContainer from './DashboardContainer/DashboardContainer';
import FeedContainer from './DashboardContainer/EventsFeedContainer/EventsFeedContainer';
export default function Dashboard() {
    return (
        <div className='dashboard'>
            <DashboardHeader></DashboardHeader>
            <DashboardContainer></DashboardContainer>
        </div>
    )
}