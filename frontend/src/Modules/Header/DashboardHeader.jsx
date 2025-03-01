import React, { useEffect, useState } from 'react';
import './dashboard-header.theme.scss';
import SolidButton from '../../_components/Buttons/SolidButton';
import { authenticationService } from '../../_services';
import { getInitials } from '../../Utility/utility';
import LogoFullColoured from '../../_logo/LogoFullColoured';

export default function DashboardHeader({ children }) {
  const [session, setSession] = useState(
    authenticationService.currentSessionValue,
  );
  const user = session?.user;

  useEffect(() => {
    const subscription = authenticationService.currentSession.subscribe(
      (sessionCurrent) => {
        setSession(sessionCurrent);
      },
    );
    console.log("printing user");
    console.log(user?.userDetails);
    
    return () => subscription.unsubscribe();
    
    
  }, []);

  return (
    <div className='header'>
      <div className='header_logo'>
        <LogoFullColoured/>
      </div>
      <div className="dashboard-header">
        { children }
        <div className="header-profile">
          <SolidButton customClass="profile-button" bgColor={'var(--ps-white-1)'} color={'var(--grey-900)'}>
            {getInitials(user?.userDetails?.fullName)}
          </SolidButton>
        </div>
      </div>
    </div>
  );
}
