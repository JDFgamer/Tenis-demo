import axios from 'axios';

export const GET_ALL_COURTS = "GET_ALL_COURTS";
export const FILTER_COURTS = "FILTER_COURTS";
export const FILTER_ERROR = "FILTER_ERROR";
export const GET_ALL_COURTS_ADMIN = "GET_ALL_COURTS_ADMIN";
export const CREATE_COURT = "CREATE_COURT";
export const ERROR_COURT = "ERROR_COURT";

const URL = process.env.REACT_APP_URL

export const getAllCourts = () => {
    return async (dispatch) => {
        try {
            const payload = await axios.get(`${URL}/api/court/listcourt`)
            return dispatch({
                type: GET_ALL_COURTS,
                payload: payload.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getFilterCourt = (value) => {
    return async (dispatch) => {
        try {
            const payload = await axios.get(`${URL}/api/court/filtercourt?date=${value}`)
            return dispatch({
                type: FILTER_COURTS,
                payload: payload.data
            })
        } catch (err) {
            dispatch({
                type: FILTER_ERROR,
                payload: true
            })
        }
    }
}

export const getAllCourtsAdmin = () => {
    return async (dispatch) => {
        try {
            const payload = await axios.get(`${URL}/api/court/admin/listcourt`, {
                headers: {
                    'x-access-token': window.localStorage.getItem('login'),
                    'Content-Type': 'application/json'
                }
            })
            return dispatch({
                type: GET_ALL_COURTS_ADMIN,
                payload: payload.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const createCourts = (value) => {
    return async (dispatch) => {
        try {
            const payload = await axios.post(`${URL}/api/court/createcourt`, value
                , {
                    headers: {
                        'x-access-token': window.localStorage.getItem('login'),
                        'Content-Type': 'application/json'
                    }
                })
            return dispatch({
                type: CREATE_COURT,
            })
        } catch (err) {
            console.log(err)
            return dispatch({
                type: ERROR_COURT,
            })
        }
    }
}
