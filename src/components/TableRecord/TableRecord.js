import React, { useEffect, useState  } from 'react'
import { useSelector } from 'react-redux'
import { Paper, CircularProgress, IconButton } from '@material-ui/core'
import { DataGrid, GridToolbar, GridOverlay } from '@material-ui/data-grid'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment'

import TableDialog from './TableDialog'

const Table = ({currentId, setCurrentId }) => {
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const record = useSelector((state) => state.records)

    let rows = [], columns = []

    useEffect(() => {
        if(!record.length){
            return setIsLoading(true)
        }
        setIsLoading(false)
    },[record])

    // for showing all record even without userdata
    // const rows = record.map(item => { 
    rows = record.filter(item => item.userData != null).map(item => {
        const container = {}
        container['id'] = item._id
        container['uid'] = item.uid
        container['name'] = item.userData ? item.userData.name : ''
        container['temperature'] = item.temperature
        container['status'] = item.status
        container['createdAt'] = moment(item.createdAt).format('M/D/YYYY LT')
        container['action'] = ''
        return container
    })

    columns = [
        { field: 'id', headerName: 'id', hide: true},
        { field: 'uid', headerName: 'UID',  width: 120},
        { field: 'name', headerName: 'Name', flex:1},
        { field: 'temperature', headerName: 'Temp',  width: 100},
        { field: 'status', headerName: 'Status',  width: 100 },
        { field: 'createdAt', headerName: 'Time In', width: 200, type:'dateTime'},
        { field: 'action', headerName: 'Action', width:150, sortable:false,
        renderCell: (params) => (
            <>
                <IconButton color="primary" 
                    onClick={(e) => {
                        handleEdit(params.getValue('id'))}} >
                    <EditIcon />
                </IconButton >  
                <IconButton color="secondary" onClick={e => handleDelete(params.getValue('id'))} >
                    <DeleteIcon />
                </IconButton>
            </>
        )}
    ]
    

    const loadingOverlay = () => {
        return (
        <GridOverlay>
            <div style={{position : 'absolute'}}>
                <CircularProgress/>       
            </div>
        </GridOverlay>    
    )}

    const handleEdit = (id) => {
        setCurrentId(id)
        setIsEdit(true)
        setOpen(true)
    }
    
    const handleDelete = (id) => {
        setCurrentId(id)
        setIsEdit(false);
        setOpen(true);
    }
    
    const handleClose =  () => {
        setOpen(false)
    }

    return (
        <div>
            <TableDialog 
                isOpen={open} 
                handleClose={handleClose}  
                isEdit={isEdit}
                currentId={currentId}
            />

            <Paper elevation={3}>
                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns}
                    components={{ 
                        Toolbar: GridToolbar,
                        LoadingOverlay: loadingOverlay
                    }}
                    loading={isLoading} />
                </div>
            </Paper>
        </div>
    )
}

export default Table
