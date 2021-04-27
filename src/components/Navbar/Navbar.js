import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp' 
import Cookies from 'js-cookie'
import moment from 'moment'
import decode from 'jwt-decode'
import useStyles from './styles'

const Navbar = () => {
  const [token, setToken] = useState(Cookies.get('jwtToken'))
  const [user, setUser] = useState({username : token ? decode(token).user : '', db_id : Cookies.get('db_id')})
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {
    dispatch({type: 'LOGOUT'})
    history.push('/auth')
    setUser(null)
  }
  
  useEffect(() => {
      if(token) {
        const decodedToken = decode(token)
  
        if(decodedToken.exp * 1000 < moment.now()){
          logout()
        }
      }else {
        logout()
      }
      
      setToken(Cookies.get('jwtToken'))
  }, [])


  return (
    <div className={classes.root}>
      <AppBar position="static">
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
          
          <Button color="inherit" className={classes.logout} startIcon={<ExitToAppIcon />} onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
