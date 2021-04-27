import React, { useState, useEffect } from 'react'
import { Box, Paper, Typography } from '@material-ui/core'
import ScheduleIcon from '@material-ui/icons/Schedule';
import moment from 'moment'

import useStyles from './styles'

const Timer = () => {
    const [hour, setHour] = useState(moment().format('LTS'));
    const [date, setDate] = useState(moment().format('MMM, D'));
    const classes = useStyles();

    useEffect(() => {
        let secTimer = setInterval( () => {
        setHour(moment().format('LTS'))
        setDate(moment().format('MMM, D'))
        },1000)

        return () => clearInterval(secTimer);
    }, []);

    return (
        <Paper variant='outlined'>
            <Box display='flex' alignItems='center'>
                <Box display='flex' className={classes.infoCard} justifyContent="flex-start" flexDirection="column">
                    <Typography className={classes.title} >{date}</Typography>
                    <Typography className={classes.info} color="textSecondary">{hour}</Typography>
                    
                </Box>
                <ScheduleIcon className={classes.cardIcon}/>
            </Box>
        </Paper>
    )
}

export default Timer
