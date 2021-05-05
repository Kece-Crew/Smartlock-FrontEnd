import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { 
    Paper,
    Box, 
    IconButton, 
    Typography, 
    Switch,
    Input,
    Divider
} from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'

import { uploadUser } from '../../actions/user'

import useStyles from './styles'

const ToggleData = ({checked, setChecked, setSelectedId}) => {
    const classes = useStyles()
    const [selectFile, setSelectFile] = useState(null)

    const dispatch = useDispatch()

    const handleChange = (event) => {
        setChecked(!checked)
        setSelectedId([])
    }

    const handleSubmit = () => {
        if(!selectFile) return
        const formData = new FormData()
        formData.append('data', selectFile, selectFile.name)
        dispatch(uploadUser(formData))
    }

    return (
        <Paper variant='outlined'>
            <Box display='flex' className={classes.toggledata} justifyContent="flex-start" flexDirection="column">
                <Typography variant='overline'>Toggle User Data</Typography>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    color="primary"
                    name="checkedA"
                />
                
                {checked && (
                <>
                    <Divider/>
                    <div style={{display: 'flex', flexDirection: 'column', paddingTop:'5px'}}>
                        <Typography variant='overline'>Upload User data</Typography>
                        <Input
                            onChange={e=> setSelectFile(e.target.files[0])} 
                            accept=".csv"
                            type="file"  
                            endAdornment={(
                                <IconButton onClick={handleSubmit} size="small" color="primary">
                                    <PublishIcon/>
                                </IconButton>
                            )}
                        />
                    </div>
                </>
                )}
                
                {/* <div style={{paddingTop: '10px'}}>
                    <LinearProgress variant="determinate" value={progress} />
                </div> */}
                
            </Box>
        </Paper>
    )
}

export default ToggleData
