import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between', padding: '1rem 0' }}>
        {/* Left section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" style={{ marginLeft: '1rem' }}>
            Navbar Title
          </Typography>
        </div>

        {/* Right section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* You can add more items here */}
          <Typography variant="body1">
            Item 1
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
