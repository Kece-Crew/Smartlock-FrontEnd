import React, { useEffect, useState } from 'react'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

const TableSnackBar = ({isEdit, isSuccess, setIsSuccess}) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if(isSuccess) handleClick()
    },[isSuccess])

    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false)
        setIsSuccess(false)
    }

    return (
        <div>
            <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={isEdit ? 'Data sucessfully updated' : 'Data sucessfully deleted'}
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
