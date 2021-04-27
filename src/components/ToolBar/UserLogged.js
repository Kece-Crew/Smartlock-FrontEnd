import React from 'react'
import { Paper, Box, Typography } from '@material-ui/core'
import PeopleIcon from '@material-ui/icons/People';

import useStyles from './styles'

const UserLogged = ({logged}) => {
    const classes = useStyles();

    return (
        <div>
            <Paper style={{backgroundColor:'#a5d6a7'}} variant='outlined'>
                <Box display='flex' alignItems='center'>
                    <Box display='flex' className={classes.infoCard} justifyContent="flex-start" flexDirection="column">
                        <Typography className={classes.title}>{logged}</Typography>
                        <Typography className={classes.info} color='textSecondary'>User Logged</Typography>
                    </Box>
                    <PeopleIcon className={classes.cardIcon}/>
                </Box>

            </Paper>
        </div>
    )
}

export default UserLogged
