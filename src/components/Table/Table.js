import React from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Paper } from '@material-ui/core'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';

const Table = () => {
    const data = useSelector((state) => state.userData)
    const filteredData = data.filter(item => item.userData != null)
    const finalData = filteredData.map(item => {
        const container = {}
        container['id'] = item.id
        container['uid'] = item.uid
        container['name'] = item.userData.name
        container['temperature'] = item.temperature
        container['status'] = item.status
        container['createdAt'] = moment(item.createdAt).format('M/D/YYYY LT')
        return container
    })

    const rows = finalData

    const columns = [
        { field: 'id', headerName: 'id', hide: true},
        { field: 'uid', headerName: 'UID',  width: 150},
        { field: 'name', headerName: 'Name', flex: 1},
        { field: 'temperature', headerName: 'Temp',  width: 100},
        { field: 'status', headerName: 'Status',  width: 100 },
        { field: 'createdAt', headerName: 'Time In', width: 250, type:'dateTime'}
    ];

    return (
        <Paper elevation={3}>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid rows={rows} columns={columns}
                components={{ 
                    Toolbar: GridToolbar,
                }} />
            </div>
        </Paper>
    )
}

export default Table
