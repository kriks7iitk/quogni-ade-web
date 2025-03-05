import React from 'react';
import DashboardHeader from '../Header/DashboardHeader';
import './dashboard.theme.scss';
import DevelopmentEnvironment from '../DevelopmentEnvironment/DevelopmentEnvironment';
export default function Builder() {
    return (
        <div className='dashboard'>
            <div className='dashboard-page'>
            <DashboardHeader/>
            <DevelopmentEnvironment/>
            </div>
        </div>
    )
}