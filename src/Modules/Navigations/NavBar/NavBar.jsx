import React, { useState } from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { SidebarData } from './menuOptions';
import '../navigation.theme.scss';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>

        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            {/* <FaIcons.FaBars onClick={showSidebar} /> */}
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                {/* <AiIcons.AiOutlineClose /> */}
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
    </>
  );
}

export function ConditionalNavbar() {
    const location = useLocation();
    const excludedRoutes = ['/signup', '/singin']; // Routes where Navbar should not be displayed
  
    // Render Navbar only if the current route is not in the excluded routes
    if (!excludedRoutes.includes(location.pathname)) {
      return <Navbar />;
    }
    return null;
}