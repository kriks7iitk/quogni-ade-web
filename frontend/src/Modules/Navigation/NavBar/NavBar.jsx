import React, { useState } from 'react';
import Icon from '../../../_icons/svgs/SolidIcons';
import SolidButton from '../../../_components/Buttons/SolidButton';
import '../navigation.theme.scss';
import PiggieStackName from '../../BrandAndLogo/PiggieStackName';
import { kebabCaseToNormal } from '../../../Utility/utility';
import { useNavigate } from 'react-router-dom';

export const NavBar = ({ isExpanded, setIsExpanded }) => {

  const [selectedItem, setSelectedItem] = useState('');
  const navigate = useNavigate();
  const drawerWidth = isExpanded ? 250 : 60;

  const handleNavigation = (path) => {
    if(path === 'dashboard'){
      navigate('/');
    }else{
      navigate(`/${path}`);

    }
    
    
    setSelectedItem(path);
  };

  

  return (
    <div>
    </div>
  );
};
