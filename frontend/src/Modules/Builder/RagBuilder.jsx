import React from 'react';
import DashboardHeader from '../Header/DashboardHeader';
import './dashboard.theme.scss';
import RagDevelopmentEnvironment from '../RagDevelopmentEnvironment/RagDevelopmentEnvironment';
export default function RagBuilder() {
    return (
        <div className='dashboard'>
            <div className='dashboard-page'>
            <DashboardHeader/>
            <RagDevelopmentEnvironment/>
            </div>
        </div>
    )
}