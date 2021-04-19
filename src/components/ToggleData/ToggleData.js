import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { 
    Card, 
    CardContent, 
    IconButton, 
    Typography, 
    Switch,
    Input,
    Divider
} from '@material-ui/core'

import { uploadUser } from '../../actions/user'

import PublishIcon from '@material-ui/icons/Publish'

const ToggleData = ({checked, setChecked}) => {
    const [selectFile, setSelectFile] = useState(null)

    const dispatch = useDispatch()

    const handleChange = (event) => {
        setChecked(!checked)
    }

    const handleSubmit = () => {
        if(!selectFile) return
        const formData = new FormData()
        formData.append('data', selectFile, selectFile.name)
        dispatch(uploadUser(formData))
    }

    return (
        <Card elevation={3}>
            <CardContent>
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
                
            </CardContent>
        </Card>
    )
}

export default ToggleData
