import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material'

const TopBar = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography align="center" variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                    Movies Tracker
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar;