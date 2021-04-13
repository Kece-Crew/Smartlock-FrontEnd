import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Cookies from 'js-cookie'
import moment from 'moment'
import decode from 'jwt-decode'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  dbName: {
    paddingRight: '20px'
  }
}));

const Navbar = () => {
  const [token, setToken] = useState(Cookies.get('jwtToken'))
  const [user, setUser] = useState(Cookies.get('db_id'))
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
          <Typography variant="overline" className={classes.dbName}>{user ? user : ''}</Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
