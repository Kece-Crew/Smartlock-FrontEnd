import React from 'react'
import { Container, Typography, Grid, Paper, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    title: {
      fontSize: '25px',
    },
    paper :{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

const NoMatch = () => {
    const classes = useStyles()
    return (
        <Container maxWidth="lg">
            <div className={classes.paper}>
                <Typography variant="h1">404</Typography>
                <Typography className={classes.title} variant="overline">Page Not Found :(</Typography>
            </div>
        </Container>
    )
}

export default NoMatch
