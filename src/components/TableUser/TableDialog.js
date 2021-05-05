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
import { updateUser, deleteUser } from '../../actions/user'

import TableSnackBar from './TableSnackBar'

const TableDialog = ({ isOpen, handleClose, isEdit, currentId }) => {
    const [open, setOpen] = useState(false)
    const [userData, setUserData] = useState({ uid: '', name: ''})
    
    const data = useSelector((state) => state.users)
    const userdata = currentId ? data.users.find((rec) => rec._id === currentId) : null

    const dispatch = useDispatch()

    useEffect(() => {
        if(userdata) setUserData(userdata)
        
        if(isOpen){
            setOpen(true)
        } else {
            setOpen(false)
        }
    },[userdata, isOpen])

    const handleSubmit = () => {
        if(!isEdit){
            dispatch(deleteUser(currentId))
        } else {
            dispatch(updateUser(currentId, userData))
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
                        {isEdit ? 'Edit userdata' : 'Delete userdata'}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {!isEdit && 'Are you sure want to delete this userdata ?'}
                    </DialogContentText>
                    {isEdit && (
                    <form style={{paddingBottom: '20px'}}>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <TextField disabled value={!userData ? '' : userData.uid} variant="outlined"  label="UID"/>
                            </Grid>
                            <Grid item>
                                <TextField value={!userData ? '' : userData.name} onChange={e => setUserData({...userData, name: e.target.value})} variant="outlined"  label="Name"/>
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
