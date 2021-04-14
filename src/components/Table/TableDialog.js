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
import { updateData, deleteData} from '../../actions/data'

import TableSnackBar from './TableSnackBar'

const TableDialog = ({isOpen, handleClose, isEdit, currentId}) => {
    const [open, setOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const [userData, setUserData] = useState({ uid: '', userData:{ name: '' }, temperature: ''})
    const record = useSelector((state) => currentId ? state.userData.find((rec) => rec._id === currentId) : null)

    const dispatch = useDispatch()

    useEffect(() => {
        if(record) setUserData(record)
        if(isOpen){
            setOpen(true)
        } else {
            setOpen(false)
        }
    },[record, isOpen])

    const handleSubmit = () => {
        if(!isEdit){
            console.log('delete')
            dispatch(deleteData(currentId))
        } else {
            console.log('update')
            dispatch(updateData(currentId, userData))
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
                            <Grid item>
                                <TextField disabled value={userData.uid} variant="outlined"  label="UID"/>
                            </Grid>
                            <Grid item>
                                <TextField disabled value={!userData.userData ? '' : userData.userData.name} variant="outlined"  label="Name"/>
                            </Grid>
                            <Grid item>
                                <TextField variant="outlined" value={userData.temperature} onChange={e => setUserData({...userData, temperature: e.target.value})} label="Temperature"/>
                            </Grid>
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
