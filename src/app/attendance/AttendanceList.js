import React, { useEffect, useState } from 'react';
import { getAllAttendances } from './api';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const AttendanceList = () => {
    const [attendances, setAttendances] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllAttendances();
            setAttendances(data.filter((item) => item.status));
        };
        fetchData();
    }, []);


    return (
        <div>
            <Typography variant="h3">
                出席者リスト
            </Typography>
            <List>
                {attendances.map((attendance, index) => (
                    <ListItem key={index} disableRipple>
                        <ListItemText primary={attendance.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default AttendanceList;