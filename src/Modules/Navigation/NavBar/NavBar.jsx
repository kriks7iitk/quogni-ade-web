import React from 'react';
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

export const NavBar = ({ isExpanded, setIsExpanded }) => {
  const drawerWidth = isExpanded ? 250 : 60;

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
                sx={{
                  '&:hover': {
                    backgroundColor: '#f0f0f0', // Change the background color on hover
                  },
                  '&:hover .MuiListItemIcon-root': {
                    color: '#007bff', // Change icon color on hover
                  },
                  '.MuiListItemIcon-root': {
                    width: '40px', // Change icon color on hover
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    width: '40px',
                  }}
                >
                  <Icon
                    name={text}
                    fill={text === 'builder' ? '#EE7071' : '#f0f0f0'}
                  />
                </ListItemIcon>
                {isExpanded && (
                  <ListItemText
                    sx={{
                      color: '#f0f0f0',
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
          marginBottom: '30px',
        }}
      />
      <List>
        {['builder', 'explore', 'community'].map((text, index) => (
          <ListItem
            sx={{
              marginBottom: '10px',
            }}
            key={text}
            disablePadding
          >
            <ListItemButton
              sx={{
                '&:hover': {
                  backgroundColor: '#f0f0f0', // Change the background color on hover
                },
                '&:hover .MuiListItemIcon-root': {
                  color: '#007bff', // Change icon color on hover
                },
              }}
            >
              <ListItemIcon>
                <Icon
                  name={text}
                  fill={text === 'builder' ? '#EE7071' : '#f0f0f0'}
                />
              </ListItemIcon>
              {isExpanded && (
                <ListItemText
                  sx={{
                    color: text === 'builder' ? '#EE7071' : '#f0f0f0',
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
        open={true} // Always open to show compressed or expanded
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
        <div className="menu-header-logo">
          <SolidButton
            leftIcon="piggie-white"
            className="menu-icon"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
            iconWidth={25}
            iconFill="#ffffff"
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
