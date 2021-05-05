import React, { useState  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Paper, IconButton } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import TableDialog from './TableDialog'
import CustomToolbar from '../ToolBar/CustomToolbar'
import LoadingOverlay from '../ToolBar/LoadingOverlay'

import { deleteUser } from '../../actions/user'

const Table = ({currentId, setCurrentId, selectedId, setSelectedId }) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(true)
    const data = useSelector((state) => state.users)

    let rows = [], columns = []

    rows = data.users.map(item => {
        const container = {}
        container['id'] = item.id
        container['uid'] = item.uid
        container['name'] = item.name
        // container['createdAt'] = moment(item.createdAt).format('M/D/YYYY LT')
        return container
    })

    columns = [
        { field: 'id', headerName: 'id', hide: true},
        { field: 'uid', headerName: 'UID',  flex:1},
        { field: 'name', headerName: 'Name', flex:1},
        // { field: 'createdAt', headerName: 'Time In', width: 200, type:'dateTime'},
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
        selectedId.map(item => {
            return dispatch(deleteUser(item))
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
                            field : 'name',
                            sort : 'asc'
                        }]}
                        checkboxSelection
                        onSelectionModelChange={e => handleCheck(e)}
                        loading={data.isLoading} 
                    />
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default Table
