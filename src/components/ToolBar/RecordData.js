import moment from 'moment'
import { useSelector } from 'react-redux'


export function RecordData() {
    const record = useSelector((state) => state.records)
    const rows = record.filter(item => item.userData != null).map(item => {
        const container = {}
        container['id'] = item._id
        container['uid'] = item.uid
        container['name'] = item.userData ? item.userData.name : ''
        container['temperature'] = item.temperature
        container['status'] = item.status
        container['createdAt'] = moment(item.createdAt).format('M/D/YYYY LT')
        container['action'] = ''
        return container
    })    
    
    return {rows}
}
