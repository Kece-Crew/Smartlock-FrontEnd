import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: 'bold'
    },
    user: {
        marginRight: theme.spacing(3)
    },
    dbName: {
        fontSize: '10px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
    },
    username: {
        fontSize: '14px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        fontWeight:'bold'
    },
    logout: {
        fontWeight: 'bold'
    }
}))