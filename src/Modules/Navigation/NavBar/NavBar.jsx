import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '../../../_icons/svgs/SolidIcons';
import SolidButton from '../../../_components/Buttons/SolidButton';
import '../navigation.theme.scss';
import PiggieStackName from '../../BrandAndLogo/PiggieStackName';
import { kebabCaseToNormal } from '../../../Utility/utility';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

export const NavBar = ({ isExpanded, setIsExpanded }) => {
  const [selectedItem, setSelectedItem] = useState('');
  const navigate = useNavigate();
  const drawerWidth = isExpanded ? 250 : 60;

  const handleNavigation = (path) => {
    navigate(`/${path}`);
    setSelectedItem(path);
  };
  console.log('selectedItem', selectedItem);

  const list = () => (
    <Box sx={{ width: drawerWidth }} role="presentation">
      <List
        sx={{
          marginBottom: '30px',
        }}
      >
        {['dashboard', 'portfolio', 'market-place', 'library'].map(
          (text, index) => (
            <ListItem
              sx={{
                marginBottom: '10px',
              }}
              key={text}
              disablePadding
            >
              <ListItemButton
                onClick={() => handleNavigation(text)}
                sx={{
                  backgroundColor:
                    selectedItem === text ? '#fff' : 'transparent',
                  color: selectedItem === text ? '#007bff' : '#f0f0f0',
                  margin: isExpanded ? '10px' : '2px',
                  borderRadius: '10px',

                  '&:hover': {
                    backgroundColor: '#D3D3D3',
                    color: '#000050',
                    opacity: 0.8,
                  },
                  '&:hover .MuiListItemIcon-root': {
                    color: '#007bff',
                  },
                  '.MuiListItemIcon-root': {
                    width: '30px',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    width: '40px',
                    justifyContent: 'left',
                    '&:hover': {
                      backgroundColor: '#D3D3D3',
                      color: '#000050',
                      opacity: 0.8,
                    },
                  }}
                >
                  <Icon
                    name={text}
                    fill={
                      selectedItem === text
                        ? '#000050' // Color for selected item
                        : text === 'builder'
                          ? '#EE7071' // Color for 'builder'
                          : '#f0f0f0'
                    } // Default color}
                  />
                </ListItemIcon>
                {isExpanded && (
                  <ListItemText
                    classes={{ root: 'list-item-text' }}
                    sx={{
                      color: selectedItem === text ? '#0b1644' : '#FFFFFF',
                      // transition: 'color 0.3s',
                      '&:hover': {
                        color: '#000050',
                        opacity: 1,
                      },
                    }}
                    primary={kebabCaseToNormal(text)}
                  />
                )}{' '}
              </ListItemButton>
            </ListItem>
          ),
        )}
      </List>
      <Divider
        sx={{
          height: '1px', // Increase the thickness of the divider
          marginLeft: '16px', // Add padding (margin) on the left
          marginRight: '16px', // Add padding (margin) on the right
          backgroundColor: '#f0f0f0', // Optionally, set a custom color for the divider
          marginBottom: '20px',
        }}
      />
      <List>
        {['builder', 'explore', 'community'].map((text, index) => (
          <ListItem
            sx={{
              marginBottom: '20px',
            }}
            key={text}
            disablePadding
          >
            <ListItemButton
              onClick={() => handleNavigation(text)}
              sx={{
                backgroundColor: selectedItem === text ? '#fff' : 'transparent',
                margin: isExpanded ? '10px' : '2px',
                borderRadius: '10px',

                '&:hover': {
                  backgroundColor: '#D3D3D3',
                  color: '#000050',
                  opacity: 0.8,
                },
                '&:hover .MuiListItemIcon-root': {
                  color: '#FFFF00', // Change icon color on hover
                },
              }}
            >
              <ListItemIcon>
                <Icon
                  name={text}
                  fill={
                    selectedItem === text
                      ? '#000050' // Color for selected item
                      : text === 'builder'
                        ? '#EE7071' // Color for 'builder'
                        : '#f0f0f0'
                  }
                  hoverIconFill="#FFFF00"
                />
              </ListItemIcon>
              {isExpanded && (
                <ListItemText
                  sx={{
                    //color: text === 'builder' ? '#EE7071' : '#FFFFFF',
                    color: selectedItem === text ? '#0b1644' : '#FFFFFF',
                  }}
                  primary={kebabCaseToNormal(text)}
                />
              )}{' '}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        variant="permanent"
        anchor="left"
        open={true}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth, // Adjust width based on toggle state
            transition: 'width 0.3s, background 3s ease-in-out', // Slow transition for the gradient
            background: '#0B1644', // Gradient from top to bottom
            overflow: 'hidden',
            borderRight: '2px solid #C5FC90',
          },
        }}
      >
        <div className="menu-header-logo pt-3 pl-3">
          <SolidButton
            leftIcon="piggie-white"
            className="menu-icon"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
            iconWidth={25}
            iconFill="#ffffff"
            hoverIconFill="#ffffff"
          />
          {isExpanded && (
            <PiggieStackName
              firstColor="#EE7071"
              secondColor="#ffffff"
              size={25}
            />
          )}
        </div>
        {list()}
      </SwipeableDrawer>
    </div>
  );
};
