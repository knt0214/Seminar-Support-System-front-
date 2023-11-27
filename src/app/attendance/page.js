'use client'
import * as React from 'react';
import styles from './page.module.css'
import ButtonAppBar from '../components/AppBar';
import { useState } from 'react';
import AttendanceList from './AttendanceList';
import RegisterAttendance from './RegisterAttendance';
import Footer from '../components/Footer';

import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';




const attendance = () => {
    const [isVisible_regi, setIsVisible_regi] = useState(false);
    const [isVisible_view, setIsVisible_view] = useState(false);

    const registerAttendance = () => {
        setIsVisible_regi(!isVisible_regi);
        setIsVisible_view(false);
    }

    const viewAttendance = () => {
        setIsVisible_view(!isVisible_view);
        setIsVisible_regi(false);
    }


    return (
        <main className={styles.main}>
            <ButtonAppBar />
            <Typography variant="h1">
                attendance
            </Typography>

            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={5} mb={2}>
                <Grid item>
                    <Button onClick={registerAttendance} variant="outlined" size="large">出席登録</Button>
                </Grid>
                <Grid item>
                    <Button onClick={viewAttendance} variant="outlined" size="large">出席者リスト</Button>
                </Grid>
            </Grid>

            {isVisible_regi && <RegisterAttendance />}
            
            {isVisible_view && <AttendanceList />}


            <Footer />
        </main>
    );
}

export default attendance;