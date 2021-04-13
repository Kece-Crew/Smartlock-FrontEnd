import React, { useState } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import {  
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText,
    DialogTitle,
    Paper, 
    Typography,
    IconButton,
    Button,
    TextField,
    Grid,
    makeStyles
} from '@material-ui/core'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { updateData, deleteData } from '../../actions/data'

const useStyles = makeStyles({
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    }
});


const Table = () => {
    const [recordId, setRecordId] = useState('')
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(true)
    const [recordData, setRecordData] = useState({})
    const data = useSelector((state) => state.userData)
    const dispatch = useDispatch()
    const classes = useStyles();

    // const rowData = data.filter(item => item.userData != null).map(item => {
    const rowData = data.map(item => {
        const container = {}
        container['id'] = item.id
        container['uid'] = item.uid
        container['name'] = item.userData ? item.userData.name : ''
        container['temperature'] = item.temperature
        container['status'] = item.status
        container['createdAt'] = moment(item.createdAt).format('M/D/YYYY LT')
        container['action'] = ''
        return container
    })

    const columnData = [
        { field: 'id', headerName: 'id', hide: true},
        { field: 'uid', headerName: 'UID',  width: 120},
        { field: 'name', headerName: 'Name', flex:1},
        { field: 'temperature', headerName: 'Temp',  width: 100},
        { field: 'status', headerName: 'Status',  width: 100 },
        { field: 'createdAt', headerName: 'Time In', width: 200, type:'dateTime'},
        { field: 'action', headerName: 'Action', width:150, 
        renderCell: (params) => (
            <>
                <IconButton color="primary" onClick={handleEdit} value={params.getValue('id')}>
                    <EditIcon />
                </IconButton >  
                <IconButton color="secondary" onClick={handleDelete} value={params.getValue('id')}>
                    <DeleteIcon />
                </IconButton>
            </>
        )}
    ];

    const handleEdit = (e) => {
        setRecordId(e.currentTarget.value)
        if(!recordId){
            return
        }
        setIsEdit(true);
        setOpen(true);
    }
    
    const handleDelete = (e) => {
        setRecordId(e.currentTarget.value)
        if(!recordId){
            return
        }
        setIsEdit(false);
        setOpen(true);
    }
    
    const handleClose =  (cancel = false) => {
        setOpen(false)
        if(!cancel){
            return
        }

        if(!isEdit){
            dispatch(deleteData(recordId))
        } else {
            // dispatch(updateData())
        }

    }

    return (
        <>
        <Dialog
            open={open}
            onClose={handleClose}
        >
        <DialogTitle id="alert-dialog-title">
            <Typography className={classes.title} align="center">
                {isEdit ? 'Edit Record' : 'Delete Record'}
            </Typography>
        </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Grid container spacing={2}>
                        
                    </Grid>
                    {isEdit ? 'Edit' : 'Are you sure want to delete this record ?'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(false)} variant="contained" color={isEdit ? 'secondary' : 'primary'}>
                    No
                </Button>
                <Button onClick={() => handleClose(true)} variant="contained" color= {isEdit ? 'primary':'secondary'} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>

        <Paper elevation={3}>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid rows={rowData} columns={columnData}
                components={{ 
                    Toolbar: GridToolbar,
                }} />
            </div>
        </Paper>
        </>
    )
}

export default Table
