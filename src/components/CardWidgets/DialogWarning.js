import React from 'react';
import {  
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText,
    DialogTitle,
    Button,
} from '@material-ui/core'

const DialogWarning = ({message, open, setOpen}) => {
    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='sm'
            >
                <DialogTitle id="alert-dialog-title">Alert</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} color="primary" autoFocus>
                    Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogWarning
