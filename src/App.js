import React from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home/Home'
import Login from './components/Login/Login'

const App = () => {
    return (
        <BrowserRouter>
        <Container maxWidth='lg'>
            <Switch>
                <Route path="/auth" exact component={Login}/>
                <Route path="/" exact component={Home}/>
            </Switch>
        </Container>
        </BrowserRouter>
    )
}

export default App