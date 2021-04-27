import React, { useEffect, useState } from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'

import { getData } from '../../actions/data'
import { getUserdata } from '../../actions/user' 

import Navbar from '../Navbar/Navbar'
import TableRecord from '../TableRecord/TableRecord'
import TableUser from '../TableUser/TableUser'
import Timer from '../ToolBar/Timer'
import ToggleData from '../ToolBar/ToggleData'
import DialogWarning from '../ToolBar/DialogWarning'
import UserLogged from '../ToolBar/UserLogged'
import UserWarning from '../ToolBar/UserWarning'

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [currentId, setCurrentId] = useState(null)
    const [selectedId, setSelectedId] = useState([])
    const [checked, setChecked] = useState(false)
    const [warning, setWarning] = useState(0)
    const [logged, setLogged] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        const socket = io('http://localhost:7070/')
        socket.emit('albertque')
        socket.on('userLogged', () => {
            dispatch(getData())
            setLogged((prev) => prev+1)
        })
        socket.on('warning', (data) => {
            dispatch(getData())
            setIsOpen(true)
            setMessage(data.message)
            setWarning((prev) => prev+1)
        })
        dispatch(getUserdata())
        dispatch(getData())
        
    },[dispatch, currentId, checked])

    return (
        <>
            <Navbar/>
            <DialogWarning open={isOpen} setOpen={setIsOpen} message={message}/>
            <div style={{paddingTop : '20px'}}>
                <Grid container justify="flex-start" spacing={3}>
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
                
                <div style={{paddingTop : '20px'}}>
                <Grid container justify="center" alignItems="flex-start" spacing={2}>
                    <Grid item sm={12} xs={12} lg>
                        {checked ? 
                            (<TableUser 
                                currentId={currentId} 
                                setCurrentId={setCurrentId} 
                                selectedId={selectedId} 
                                setSelectedId={setSelectedId}/>) :
                            (<TableRecord 
                                currentId={currentId} 
                                setCurrentId={setCurrentId}
                                selectedId={selectedId} 
                                setSelectedId={setSelectedId}/>)
                        }
                    </Grid>
                    <Grid item sm={12} xs={12} lg={3}>
                        <ToggleData checked={checked} setChecked={setChecked}/>
                    </Grid>
                </Grid>
                </div>
            </div>
        </>
    )
}

export default Home
