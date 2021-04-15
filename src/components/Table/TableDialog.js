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
import { updateData, deleteData, updateUser, deleteUser } from '../../actions/data'

import TableSnackBar from './TableSnackBar'

const TableDialog = ({isOpen, handleClose, isEdit, currentId, checked}) => {
    const [open, setOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const [recordData, setRecordData] = useState({ uid: '', userData:{ name: '' }, temperature: ''})
    const [userData, setUserData] = useState({ uid: '', name: ''})

    const record = useSelector((state) => currentId ? state.recordData.find((rec) => rec._id === currentId) : null)

    const dispatch = useDispatch()

    useEffect(() => {
        if(checked) setUserData(record)
        if(record && !checked) setRecordData(record)
        
        if(isOpen){
            setOpen(true)
        } else {
            setOpen(false)
        }
    },[record, isOpen, checked])

    const handleSubmit = () => {
        if(!checked){
            if(!isEdit){
                // console.log('delete')
                dispatch(deleteData(currentId))
            } else {
                // console.log('update')
                dispatch(updateData(currentId, recordData))
            }
        } else {
            if(!isEdit){
                // console.log('delete')
                dispatch(deleteUser(currentId))
            } else {
                // console.log('update')
                dispatch(updateUser(currentId, userData))
            }
        }
        setSuccess(true)
        handleClose()
    }

    return (
        <div>
            <TableSnackBar isEdit={isEdit} isSuccess={success} setIsSuccess={setSuccess}/>
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
                    <form style={{paddingBottom: '20px'}}>
                        <Grid container spacing={2} direction="column">
                            {!checked ? (
                                <>
                                    <Grid item>
                                        <TextField disabled value={recordData.uid} variant="outlined"  label="UID"/>
                                    </Grid>
                                    <Grid item>
                                        <TextField disabled value={!recordData.userData ? '' : recordData.userData.name} variant="outlined"  label="Name"/>
                                    </Grid>
                                    <Grid item>
                                        <TextField variant="outlined" value={recordData.temperature} onChange={e => setRecordData({...recordData, temperature: e.target.value})} label="Temperature"/>
                                    </Grid>
                                </>
                            ): (
                                <>
                                    <Grid item>
                                        <TextField disabled value={!userData ? '' : userData.uid} variant="outlined"  label="UID"/>
                                    </Grid>
                                    <Grid item>
                                        <TextField value={!userData ? '' : userData.name} onChange={e => setUserData({...userData, name: e.target.value})} variant="outlined"  label="Name"/>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </form>
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
