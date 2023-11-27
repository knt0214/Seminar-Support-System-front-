'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { rgbToHex } from '@mui/material';

export default function Footer() {
    return (

        <AppBar position="fixed"
            style={{
                top: 'auto',
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                width: '100%',
            }}
        >
            <Toolbar>
                <Typography variant="caption" component="div" sx={{ flexGrow: 1, textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }} >
                    ©2023 Web-App
                </Typography>
            </Toolbar>
        </AppBar>

    );
}
