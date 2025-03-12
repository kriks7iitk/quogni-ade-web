import React from 'react';
import DashboardHeader from '../Header/DashboardHeader';
import './dashboard.theme.scss';
import AgentDevelopmentEnvironment from '../AgentDevelopmentEnvironment/AgentDevelopmentEnvironment';
export default function AgentBuilder() {
    return (
        <div className='dashboard'>
            <div className='dashboard-page'>
            <DashboardHeader/>
            <AgentDevelopmentEnvironment/>
            </div>
        </div>
    )
}