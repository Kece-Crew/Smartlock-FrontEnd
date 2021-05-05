import React, { useState, useEffect } from 'react'

import { Grid } from '@material-ui/core'

import UserLogged from './UserLogged'
import UserWarning from './UserWarning'
import Timer from './Timer'
import DialogWarning from './DialogWarning'

import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'

import { getData } from '../../actions/data'
import { getUserdata } from '../../actions/user'

const CardWidgets = () => {
    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [warning, setWarning] = useState(0)
    const [logged, setLogged] = useState(0)

    useEffect(() => {
        const socket = io('http://localhost:7070/')
        socket.emit('albertque')
        socket.on('userLogged', () => {
            dispatch(getData())
            setLogged((prev) => prev+1)
            return
        })
        socket.on('warning', (data) => {
            dispatch(getData())
            setIsOpen(true)
            setMessage(data.message)
            setWarning((prev) => prev+1)
            return
        })
        dispatch(getUserdata())
        dispatch(getData())
        
    },[dispatch])

    return (
        <div>
            <DialogWarning open={isOpen} setOpen={setIsOpen} message={message}/>   
            <Grid container justify="center" alignItems="center" spacing={3}>
                <Grid item>
                    <UserLogged logged={logged}/>
                </Grid>
                <Grid item>
                    <UserWarning warning={warning}/>
                </Grid>
                <Grid item>
                    <Timer/>
                </Grid>
            </Grid>
        </div>
    )
}

export default CardWidgets
