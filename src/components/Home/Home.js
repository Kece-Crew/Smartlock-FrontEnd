import React, { useEffect, useState } from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { getData } from '../../actions/data' 

import Navbar from '../Navbar/Navbar'
import Table from '../Table/Table'
import Timer from '../Timer/Timer'

const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getData())
    },[dispatch, currentId])

    return (
        <>
            <Navbar/>
            <div style={{paddingTop : '20px'}}>
                <Grid container justify='center' alignItems="flex-start" spacing={2}>
                    <Grid item sm={12} xs={12} lg={9}>
                        <Table currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                    <Hidden only={['sm', 'xs','md']}>
                        <Grid item lg>
                            <Timer/>
                        </Grid>
                    </Hidden>
                </Grid>
            </div>
        </>
    )
}

export default Home
