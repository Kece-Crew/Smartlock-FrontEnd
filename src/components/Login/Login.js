import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Paper, Grid, Button, Typography, Grow } from '@material-ui/core'
import { useDispatch } from 'react-redux' 
import useStyles from './styles'

import { signIn, signUp } from '../../actions/auth'

import Input from './Input'

const Login = () => {
    const [authData, setAuthData] = useState({username: '', password: '', confirmPassword: '', db_id: ''})
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()

        if(isSignUp) {
            dispatch(signUp(authData, history))
        } else {
            dispatch(signIn(authData, history))
        }
    }

    const handleChange = (e) => {
        setAuthData({...authData, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () => setShowPassword((prev) => !prev)

    const switchMode = () => {
        setIsSignUp((prev) => !prev)
        setShowPassword(false)
    }
    
    return (
        <div>
            <Grow in={true} timeout={1000}>
                <Container component='main' maxWidth='xs'>
                    <Paper className={classes.paper} elevation={3}>
                        <Typography variant="h4">{isSignUp ? 'SIGN UP' : 'SIGN IN'}</Typography>
                        <form autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Input name="username" label="Username" handleChange={handleChange} autoFocus/>
                                {isSignUp && <Input name="db_id" label="DB ID" handleChange={handleChange}/>}
                                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                                {/* {isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>} */}
                            </Grid>
                            
                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                {isSignUp ? 'Sign Up' : 'Sign In'}
                            </Button>
                            
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Button onClick={switchMode}>
                                        {isSignUp ? 'Have an account? Sign In' : 'Don\'t have an account? Sign Up'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </Grow>
        </div>
    )
}

export default Login
