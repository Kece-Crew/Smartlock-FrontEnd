import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { dataSuccess } from '../../actions/data'

const TableSnackBar = ({ isEdit, isSuccess }) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(isSuccess) handleClick()
    },[isSuccess])

    const handleClick = () => {
        setOpen(true)
        dispatch(dataSuccess(false))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setOpen(false)
    }

    return (
        <div>
            <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={isEdit ? 'Data successfully updated' : 'Data successfully deleted'}
            action={
                <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
                </React.Fragment>
            }
            />
        </div>
    )
}

export default TableSnackBar
