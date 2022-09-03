import { GET_ALL_COURTS, FILTER_COURTS, FILTER_ERROR, GET_ALL_COURTS_ADMIN, CREATE_COURT, ERROR_COURT } from '../actions/actions.jsx'
const initialState = {
    listCourts: [],
    errorFilter: false,
    listCourtsAdmin: [],
    createCourtError: false,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COURTS:
            return {
                ...state,
                listCourts: action.payload
            }
        case FILTER_COURTS:
            return {
                ...state,
                listCourts: action.payload,
                errorFilter: false
            }
        case FILTER_ERROR:
            return {
                ...state,
                errorFilter: action.payload
            }
        case GET_ALL_COURTS_ADMIN:
            return {
                ...state,
                listCourtsAdmin: action.payload
            }
        case CREATE_COURT:
            return {
                ...state,
                createCourtError: false
            }
        case ERROR_COURT:
            return {
                ...state,
                createCourtError: true
            }
        default:
            return {
                state
            };
    }
}

export default rootReducer