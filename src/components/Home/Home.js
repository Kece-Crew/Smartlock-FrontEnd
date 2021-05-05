import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { getData } from '../../actions/data'
import { getUserdata } from '../../actions/user'

import Navbar from '../Navbar/Navbar'
import TableRecord from '../TableRecord/TableRecord'
import TableUser from '../TableUser/TableUser'
import ToggleData from '../ToolBar/ToggleData'

import CardWidgets from '../CardWidgets/CardWidgets'

const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const [selectedId, setSelectedId] = useState([])
    const [checked, setChecked] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserdata())
        dispatch(getData())
        
    },[dispatch, currentId, checked])

    return (
        <>
            <Navbar/>
            <div style={{paddingTop : '20px'}}>
                <CardWidgets/>

                <div style={{paddingTop : '20px'}}>
                <Grid container justify="center" alignItems="flex-start" spacing={2}>
                    <Grid item sm={12} xs={12} lg={3}>
                        <ToggleData checked={checked} setChecked={setChecked} setSelectedId={setSelectedId}/>
                    </Grid>
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
                </Grid>
                </div>
            </div>
        </>
    )
}

export default Home
