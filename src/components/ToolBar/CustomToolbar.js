import { GridToolbar, GridToolbarContainer } from '@material-ui/data-grid'
import { Grid, Button } from '@material-ui/core'

const CustomToolbar = ({handleDelete, selected}) => {
    return (
        <GridToolbarContainer>
            <Grid container justify="space-between" alignItems="center">
                <GridToolbar/>
                {selected.length ? (
                    <Button size="small" variant="contained" disableElevation color="secondary" onClick={handleDelete}>Delete</Button>
                ) : (<></>)}
            </Grid>
        </GridToolbarContainer>
    )
}

export default CustomToolbar
