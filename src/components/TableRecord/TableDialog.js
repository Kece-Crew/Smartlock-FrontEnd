import React, { useState, useEffect } from 'react';
import {  
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText,
    DialogTitle,
    Typography,
    Button,
    TextField,
    Grid
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { updateData, deleteData } from '../../actions/data'

import TableSnackBar from './TableSnackBar'

const TableDialog = ({isOpen, handleClose, isEdit, currentId}) => {
    const [open, setOpen] = useState(false)
    const [recordData, setRecordData] = useState({ uid: '', userData:{ name: '' }, temperature: ''})
    
    const data = useSelector((state) => state.records)
    const record = currentId ? data.records.find((rec) => rec._id === currentId) : null

    const dispatch = useDispatch()

    useEffect(() => {
        if(record) setRecordData(record) 
        
        if(isOpen){
            setOpen(true)
        } else {
            setOpen(false)
        }
    },[record, isOpen])

    const handleSubmit = () => {
        if(!isEdit){
            dispatch(deleteData(currentId))
        } else {
            dispatch(updateData(currentId, recordData))
        }
        handleClose()
    }

    return (
        <div>
            <TableSnackBar isEdit={isEdit} isSuccess={data.isSuccess}/>
            <Dialog
            open={open}
            onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography align="center">
                        {isEdit ? 'Edit Record' : 'Delete Record'}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {!isEdit && 'Are you sure want to delete this record ?'}
                    </DialogContentText>
                    {isEdit && (
                        <Grid container spacing={2} direction="column">   
                            <Grid item>
                                <TextField disabled value={recordData.uid} variant="outlined"  label="UID"/>
                            </Grid>
                            <Grid item>
                                <TextField disabled value={!recordData.userData ? '' : recordData.userData.name} variant="outlined"  label="Name"/>
                            </Grid>
                            <Grid item>
                                <TextField variant="outlined" value={recordData.temperature} onChange={e => setRecordData({...recordData, temperature: e.target.value})} type="number" label="Temperature"/>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color={isEdit ? 'secondary' : 'primary'}>
                        No
                    </Button>
                    <Button variant="contained" onClick={handleSubmit} color= {isEdit ? 'primary':'secondary'} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TableDialog
