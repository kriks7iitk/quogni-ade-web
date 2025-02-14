import React, { createContext, useState, useContext } from 'react'
import DashboardHeader from '../Header/DashboardHeader'
import './platform.theme.scss'
import Navigation from './Navigation/SubNavigation/Navigation'
import LeftPanel from '../LeftPanel/LeftPanel'
import { Outlet } from 'react-router-dom';
import Breadcrumbs from './Navigation/BreadCrumbs'
import PlatformNavigation from './Navigation/PlatformNavigation'
import LogoFullColoured from '../../_logo/LogoFullColoured'

const PlatformContext = createContext()
export function usePlatform() {
    const context = useContext(PlatformContext);
    if (!context) {
      throw new Error("usePlatform must be used within a PlatformProvider");
    }
    return context;
}

export default function PlatformLayout({ children }) {

  const [activeTab, setActiveTab] = useState('tools');
  return (
    <PlatformContext.Provider value={ { activeTab, setActiveTab } }>
        <div>
            <div className='platform-layout'>
                <div className='platform-layout_main'>
                    <div className='platform-layout_header'>
                        <DashboardHeader>
                            <Breadcrumbs/>
                        </DashboardHeader>
                    </div>
                    
                    <div className='platform-layout__content'>
                        <LeftPanel width='15'> 
                            <PlatformNavigation/>
                        </LeftPanel>
                        <div className='platform-layout__content__body'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PlatformContext.Provider>
  )
}


