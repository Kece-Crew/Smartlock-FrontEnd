import { CircularProgress } from '@material-ui/core'
import { GridOverlay } from '@material-ui/data-grid'

const LoadingOverlay = () => {
    return (
        <GridOverlay>
            <div style={{position : 'absolute'}}>
                <CircularProgress/>   
            </div>
        </GridOverlay>
    )
}

export default LoadingOverlay
