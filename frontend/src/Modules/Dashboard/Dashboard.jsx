import React from 'react';
import DashboardHeader from './DashboardHeader/DashboardHeader';
import './dashboard.theme.scss';
import DashboardContainer from '../DashboardContainer/DashboardContainer';
import SubNavigation from '../Navigation/SubNavigation/Navigation';
import { LeftPanelProvider } from '../LeftPanel/LeftPanelProvider';
export default function Dashboard() {
    return (
        <div className='dashboard'>
            {/* <LeftPanelProvider>
                <SubNavigation/>
            </LeftPanelProvider> */}
            <div className='dashboard-page'>
            <DashboardHeader/>
            
            <DashboardContainer/>
            </div>
        </div>
    )
}