import React, { useEffect, useState } from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { getData, getUserdata } from '../../actions/data' 

import Navbar from '../Navbar/Navbar'
import Table from '../Table/Table'
import Timer from '../Timer/Timer'
import ToggleData from '../ToggleData/ToggleData'

const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if(checked){
            dispatch(getUserdata())
        }else {
            dispatch(getData())
        }
    },[dispatch, currentId, checked])

    return (
        <>
            <Navbar/>
            <div style={{paddingTop : '20px'}}>
                <Grid container justify='center' direction="row" alignItems="flex-start" spacing={2}>
                    <Grid item sm={12} xs={12} lg>
                        <Table currentId={currentId} setCurrentId={setCurrentId} checked={checked}/>
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
