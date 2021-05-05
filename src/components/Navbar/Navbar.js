import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp' 
import Cookies from 'js-cookie'
import decode from 'jwt-decode'

import useStyles from './styles'
import { logout } from '../../actions/auth'

const Navbar = () => {
  const errors = useSelector((state) => state.errors)

  const [token, setToken] = useState(Cookies.get('jwtToken'))
  const [user, setUser] = useState({username : token ? decode(token).user : '', db_id : Cookies.get('db_id')})
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const logoutUser = () => {
    dispatch(logout())
    history.push('/auth')
    setUser(null)
  }
  
  useEffect(() => {
    if(errors.status === 403 || errors.status === 401){
      logoutUser()
    }
      
    setToken(Cookies.get('jwtToken'))
  }, [errors])


  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <Box display="flex" justifyContent="flex-start" className={classes.user} flexDirection="column">
            <Typography className={classes.username}>{user ? user.username : ''}</Typography>
            <Typography className={classes.dbName}>{user ? user.db_id : ''}</Typography>
          </Box>
          
          <Button color="inherit" className={classes.logout} startIcon={<ExitToAppIcon />} onClick={logoutUser}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </div>
  )
}

export default Navbar
