import React, { useEffect, useState } from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'

import { getData } from '../../actions/data'
import { getUserdata } from '../../actions/user' 

import Navbar from '../Navbar/Navbar'
import TableRecord from '../TableRecord/TableRecord'
import TableUser from '../TableUser/TableUser'
import Timer from '../Timer/Timer'
import ToggleData from '../ToggleData/ToggleData'
import DialogWarning from '../DialogWarning/DialogWarning'

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [currentId, setCurrentId] = useState(null)
    const [selectedId, setSelectedId] = useState([])
    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const socket = io('http://localhost:7070/')
        socket.emit('albertque')
        socket.on('userLogged', () => {
            dispatch(getData())
        })
        socket.on('warning', (data) => {
            dispatch(getData())
            setIsOpen(true)
            setMessage(data.message)
        })
        dispatch(getUserdata())
        dispatch(getData())
        
    },[dispatch, currentId, checked])

    return (
        <>
            <Navbar/>
            <DialogWarning open={isOpen} setOpen={setIsOpen} message={message}/>
            <div style={{paddingTop : '20px'}}>
                <Grid container justify='center' direction="row" alignItems="flex-start" spacing={2}>
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
                        <Grid container direction="column" justify='center' alignItems="stretch" spacing={2}>
                            <Hidden only={['sm', 'xs','md']}>
                                <Grid item>
                                    <Timer/>
                                </Grid>
                            </Hidden>
                            <Grid item>
                                <ToggleData checked={checked} setChecked={setChecked}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Home
