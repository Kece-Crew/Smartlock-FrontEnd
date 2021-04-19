import React, { useEffect, useState } from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { getData } from '../../actions/data'
import { getUserdata } from '../../actions/user' 

import Navbar from '../Navbar/Navbar'
import TableRecord from '../TableRecord/TableRecord'
import TableUser from '../TableUser/TableUser'
import Timer from '../Timer/Timer'
import ToggleData from '../ToggleData/ToggleData'

const Home = () => {
    const [currentId, setCurrentId] = useState(null)
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
                <Grid container justify='center' direction="row" alignItems="flex-start" spacing={2}>
                    <Grid item sm={12} xs={12} lg>
                        {checked ? 
                            (<TableUser currentId={currentId} setCurrentId={setCurrentId}/>) :
                            (<TableRecord currentId={currentId} setCurrentId={setCurrentId}/>)
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
