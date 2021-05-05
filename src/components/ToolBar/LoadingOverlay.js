import { LinearProgress } from '@material-ui/core'
import { GridOverlay } from '@material-ui/data-grid'

const LoadingOverlay = () => {
    return (
        // <GridOverlay>
        //     <div style={{position : 'absolute'}}>
        //         <CircularProgress/>   
        //     </div>
        // </GridOverlay>
        <GridOverlay>
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                <LinearProgress />
            </div>
        </GridOverlay>
    )
}

export default LoadingOverlay
