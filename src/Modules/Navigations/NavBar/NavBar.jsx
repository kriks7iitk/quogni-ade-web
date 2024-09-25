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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon

export const NavBar = ({ isExpanded, setIsExpanded }) => {
  const drawerWidth = isExpanded ? 250 : 75; // Expanded or compressed width

  const list = () => (
    <Box
      sx={{ width: drawerWidth }}
      role="presentation"
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              {isExpanded && <ListItemText primary={text} />} {/* Only show text if expanded */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              {isExpanded && <ListItemText primary={text} />} {/* Only show text if expanded */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        variant="permanent" // Permanent to keep it always visible
        anchor="left"
        open={true} // Always open to show compressed or expanded
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth, // Adjust width based on toggle state
            transition: 'width 0.3s',
          },
        }}
      >
        <IconButton
          onClick={() => setIsExpanded(!isExpanded)} // Toggle the NavBar state
          sx={{ justifyContent: 'center' }}
        >
          <MenuIcon />
        </IconButton>
        {list()}
      </SwipeableDrawer>
    </div>
  );
};
