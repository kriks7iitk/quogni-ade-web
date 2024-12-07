import React from 'react';
import './left-sidebar.theme.scss';
import Feed from './components/Feed';
import MyContacts from './components/MyContacts';

export default function LeftSidebar() {
    return (
        <div className='left-sidebar'>
            left-sidebar
            <Feed></Feed>
            <MyContacts></MyContacts>
        </div>
    );
}