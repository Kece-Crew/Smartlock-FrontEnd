import React, { useState, useEffect } from 'react'
import { useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Cookies from 'js-cookie'
import decode from 'jwt-decode'
import moment from 'moment'

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
  const [user, setUser] = useState(Cookies.get())
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {
    dispatch({type: 'LOGOUT'})
    history.push('/')
    setUser(null)
  }

  useEffect(() => {
    const token = user?.jwtToken

    if(token) {
      const decodedToken = decode(token)

      if(decodedToken.exp * 1000 < moment.now()){
        logout()
      }
    }

    setUser(Cookies.get())
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
          <Typography variant="overline" className={classes.dbName}>{user ? user.db_id : ''}</Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
