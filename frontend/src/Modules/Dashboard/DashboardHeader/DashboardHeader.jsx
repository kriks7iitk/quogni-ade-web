import React, { useEffect, useState } from 'react';
import './dashboard-header.theme.scss';
import SearchBox from '../../../_components/Search/SearchBox';
import SolidButton from '../../../_components/Buttons/SolidButton';
import { authenticationService } from '../../../_services';
import { getInitials } from '../../../Utility/utility';

export default function DashboardHeader() {
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
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="dashboard-header">
      <div className="header-left-bar"></div>
      <div className="header-search">
        <SearchBox />
      </div>
      <div className="header-profile">
        <SolidButton customClass="profile-button" bgColor={'var(--ps-white-1)'}>
          {getInitials(user?.userDetails?.fullname)}
        </SolidButton>
      </div>
    </div>
  );
}
