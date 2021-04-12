import React, { useEffect } from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { getData } from '../../actions/data' 

import Navbar from '../Navbar/Navbar'
import Table from '../Table/Table'
import Form from '../Form/Form'
import Timer from '../Timer/Timer'

const Home = () => {
    //for dispatch any action
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getData())
    },[dispatch])

    return (
        <>
            <Navbar/>
            <div style={{paddingTop : '20px'}}>
                <Grid container justify='center' alignItems="flex-start" spacing={2}>
                    <Grid item sm={12} xs={12} lg={9}>
                        <Table/>
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
