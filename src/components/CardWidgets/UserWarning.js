import React from 'react'
import { Paper, Box, Typography } from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import useStyles from './styles'

const UserWarning = ({warning}) => {
    const classes = useStyles();

    return (
        <div>
            <Paper style={{backgroundColor:'#ffee58'}} variant='outlined'>
                <Box display='flex' alignItems='center'>
                    <Box display='flex' className={classes.infoCard} justifyContent="flex-start" flexDirection="column">
                        <Typography className={classes.title}>{warning}</Typography>
                        <Typography className={classes.info} color='textSecondary'>User Warning</Typography>
                    </Box>
                    <ErrorOutlineIcon className={classes.cardIcon}/>
                </Box>

            </Paper>
        </div>
    )
}

export default UserWarning
