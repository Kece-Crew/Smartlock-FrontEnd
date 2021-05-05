import React, { useState  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Paper, IconButton, Chip } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckIcon from '@material-ui/icons/Check'
import ErrorIcon from '@material-ui/icons/Error';
import moment from 'moment'

import TableDialog from './TableDialog'
import CustomToolbar from '../ToolBar/CustomToolbar'
import LoadingOverlay from '../ToolBar/LoadingOverlay'

import { deleteData } from '../../actions/data'

const Table = ({currentId, setCurrentId, selectedId, setSelectedId }) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(true)

    const data = useSelector((state) => state.records)

    let rows = [], columns = []

    // for showing all record even without userdata
    // const rows = record.map(item => { 
    rows = data.records.filter(item => item.userData != null).map(item => {
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
        { field: 'status', headerName: 'Status',  width: 100, 
            renderCell: (params) => (
                <Chip 
                    color={params.value === 'Ok' ? 'primary' : 'secondary'} 
                    label={params.value}
                    icon={params.value === 'Ok' ? <CheckIcon/> : <ErrorIcon/>}
                    size='small'
                />
        )},
        { field: 'createdAt', headerName: 'Time In', width: 200, type:'dateTime'},
        { field: 'action', headerName: 'Action', width:150, sortable:false, disableClickEventBubbling: true,
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

    const handleCheck = (e) => {
        const idList = e.selectionModel
        setSelectedId(idList)
    }

    const handleDeleteSelected = () => {
        selectedId.forEach(item => {
            dispatch(deleteData(item))
        })
        setSelectedId([])
    }

    return (
        <div>
            <TableDialog 
                isOpen={open} 
                handleClose={handleClose}  
                isEdit={isEdit}
                currentId={currentId}
            />

            <Paper elevation={0}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                    <DataGrid autoHeight pageSize={5} rows={rows} columns={columns}
                        components={{ 
                            Toolbar: CustomToolbar,
                            LoadingOverlay: LoadingOverlay
                        }}
                        componentsProps={{
                            toolbar: {handleDelete : handleDeleteSelected, selected : selectedId}
                        }}
                        sortModel={[{
                            field : 'createdAt',
                            sort : 'desc'
                        }]}
                        loading={data.isLoading} 
                        checkboxSelection
                        onSelectionModelChange={e => handleCheck(e)}
                    />
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default Table
