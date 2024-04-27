import {
    GET_ALL_USERS,
    PUT_STATUS,
    GET_USER,
    GET_DEPARTMENTS,
    GET_MUNICIPALITIES,
    CLEAN_UP_DETAILS
} from '../actions/variables';

const initialState = {
    users : [],
    allusers: [],
    departments: [],
    municipalities: [],
    userDetails: [],
    isLoged: [false]
}

export default function rootReducer (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload.users?.sort((a,b)=>{
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        return 0;
                })
            }
        case PUT_STATUS:
            return {
                ...state,
                isLoged: action.payload
            }
        case GET_USER:
            return {
                ...state,
                userDetails: action.payload
            }
        case GET_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload
            }
        case GET_MUNICIPALITIES:
            return {
                ...state,
                municipalities: action.payload
            }
        case CLEAN_UP_DETAILS:
            return {
                ...state,
                userDetail: action.payload
            }
        default:
            return {
                ...state
            }
    }
};