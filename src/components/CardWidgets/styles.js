import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
    title: {
        fontSize: 32,
        fontWeight: 600
    },
    infoCard:{
        width:'150px',
        height: '70px',
        marginLeft: theme.spacing(1.5),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    cardIcon:{
        fontSize: 48,
        marginRight: theme.spacing(2)
    },
    info: {
        fontSize: 16,
        fontWeight: 100,
        lineHeight: 1.5,
        letterSpacing: '0.05em',
    },
    toggledata: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}))