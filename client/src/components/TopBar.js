import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const TopBar = () => {
    return (
        <AppBar position="sticky">
        <Toolbar>
            <Typography align="center" variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                Movie Tracker
            </Typography>
            <LoginButton />
            <LogoutButton />
        </Toolbar>
        </AppBar>
    )
}

export default TopBar;