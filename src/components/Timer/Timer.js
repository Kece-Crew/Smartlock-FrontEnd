import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    title: {
      fontSize: 24,
      fontWeight: 'bold'
    }
  });

const Timer = () => {
    const [date, setDate] = useState(new Date().toLocaleString());
    const classes = useStyles();

    useEffect(() => {
        let secTimer = setInterval( () => {
        setDate(new Date().toLocaleString())
        },1000)

        return () => clearInterval(secTimer);
    }, []);

    return (
        <Card elevation={3}>
            <CardContent>
                <Typography variant="h5" className={classes.title} gutterBottom>Current Time</Typography>
                <Typography variant="h6" color="textSecondary">{date}</Typography>
            </CardContent>
        </Card>
    )
}

export default Timer
