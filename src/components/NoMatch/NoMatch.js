import React from 'react'
import { Container, Typography, Button, Paper, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    title: {
      fontSize: '25px',
    }
}));

const NoMatch = () => {
    const classes = useStyles()
    return (
            <Container fixed maxWidth="lg">
            <Paper>
                <div style={{
                    position: 'absolute', 
                    left: '50%', 
                    top: '50%',
                    transform: 'translate(-50%, -50%)', 
                    display: 'flex', 
                    flexDirection: 'column'
                }}>
                    <Typography align="center" variant="h1">404</Typography>
                    <Typography align="center" className={classes.title} variant="overline">Page Not Found</Typography>
                    <Button component={Link} to="/" variant="outlined">Back To Home</Button>
                </div>
            </Paper>
            </Container>
    )
}

export default NoMatch
