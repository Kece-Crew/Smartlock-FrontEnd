import * as api from '../api'

export const getData = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUserData();

        dispatch({
            type: 'FETCH_ALL',
            payload: data
        })
    }catch (error){
        console.log(error.message)
    }
}