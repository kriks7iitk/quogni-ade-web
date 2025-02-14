import React from 'react'
import ThemeButton from '../../../_components/Buttons/ThemeButton'
import './navigation.theme.scss'
import Icon from '../../../_icons/svgs/SolidIcons'
import { usePlatform } from '../PlatformLayout'
import { useNavigate } from 'react-router-dom';


export default function () {

    const { activeTab, setActiveTab } = usePlatform();
    const navigate = useNavigate();

    const menuList = [
        {
            name: 'Dashboard',
            link: '/workspace/tools',
            iconName: 'dashboard',
        },
        {
            name: 'LLM Configuration',
            link: '/workspace/llm-configure',
            iconName: 'llm',
        },
        {
            name: 'Data Source',
            link: '/workspace/datasource',
            iconName: 'datasource',
        },
    ];

    const onMenuClick = (menu) => {
        setActiveTab(menu?.name);
        navigate(menu?.link)
    }

  return (
    <div className='platform-menu'>
        <nav className="platform-menu_menu">
            <ul>
            {menuList.map((menu,index) => {
                const isActive = location.pathname === menu.link
                return <li key={index} onClick={() => onMenuClick(menu)} className={isActive ? 'active' : ''} > <Icon name={menu?.iconName} width='20'/>{menu?.name}</li>
            })}

            <hr />

            <li className="header">Settings</li>
            <li><Icon name='settings' width='20'/>System Setting</li>
            </ul>
        </nav>

        {/* Footer */}
        <div className="footer">
            <ThemeButton leftIcon='sun' iconFill='var(--slate-600)'/>
        </div>
    </div>
  )
}
