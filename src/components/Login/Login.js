import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Paper, Grid, Button, Typography, Grow } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux' 
import useStyles from './styles'

import { signIn, signUp } from '../../actions/auth'

import Input from './Input'

const Login = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const errors = useSelector((state) => state.errors)
    
    const [authData, setAuthData] = useState({username: '', password: '', confirmPassword: '', db_id: ''})
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        if(errors.status === 400){
            setIsError(true)
            setErrorMsg(errors.message.messages)
        }else {
            setIsError(false)
        }
    },[errors])

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
        setIsError(false)
    }

    const handleShowPassword = () => setShowPassword((prev) => !prev)

    const switchMode = () => {
        setIsSignUp((prev) => !prev)
        setShowPassword(false)
        setIsError(false)
    }
    
    return (
        <div>
            <Grow in={true} timeout={1000}>
                <Container component='main' maxWidth='xs'>
                    <Paper className={classes.paper} elevation={3}>
                        
                        <Typography className={classes.title} variant="h4">{isSignUp ? 'sign up' : 'sign in'}</Typography>
                        <form autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Input name="username" label="Username" handleChange={handleChange} autoFocus error={isError}/>
                                {isSignUp && <Input name="db_id" label="Database ID" handleChange={handleChange}/>}
                                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} error={isError}/>
                                {/* {isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>} */}
                            </Grid>

                            {isError && <Typography className={classes.error} align='center' color='error'>{errorMsg}</Typography> }
                            
                            
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
