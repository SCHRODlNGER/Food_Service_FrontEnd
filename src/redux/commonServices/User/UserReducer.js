import {
    GET_USER_ADDRESS,
    GET_USER_DETAILS,
    GET_USER_ORDERS,
    SET_USER_ADDRESS,
    SET_USER_ORDER,
    GET_USER_ADDRESS_ERROR,
    SET_USER_ADDRESS_ERROR,
    GET_USER_DETAILS_ERROR,
    GET_USER_ORDERS_ERROR,
    SET_USER_ORDER_ERROR,
    GET_USER_ORDERS_CLEANUP,
    SET_USER_ORDER_CLEANUP
} from "./UserType"

import _ from "lodash"


const INITIAL_STATE = {
    userDetails: {
        firstname: "s",
        lastname: "p"
    },
    addresses: null,
    error: null,
    OrderList: null,
    OrderPrice: null,
    OrderTotalCount: null,
    confirmedOrder: null
}

const UserReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){

        case GET_USER_DETAILS:
            return {
                ...state,
                userDetails: {...action.payload}
            }
        
        case GET_USER_DETAILS_ERROR:
            return {
                ...state,
                userDetails: null,
                error: action.payload
            }

        case GET_USER_ADDRESS:
            return{
                ...state,
                addresses: [...action.payload]
            }

        case GET_USER_ADDRESS_ERROR:
            return{
                ...state,
                addresses: null,
                error: action.payload
            }
        
        case SET_USER_ADDRESS:
            return{
                ...state,
            }
        case SET_USER_ADDRESS_ERROR:
            return{
                ...state,
                addresses: null,
                error: action.payload
            }
        case GET_USER_ORDERS:
            return{
                ...state,
                OrderList: [...action.payload],
                OrderPrice: action.price,
                OrderTotalCount: action.totalCount
            }
        case GET_USER_ORDERS_ERROR:
            return{
                ...state,
                OrderList: null,
                OrderPrice: null,
                OrderTotalCount: null,
                error: action.payload
            }
        case GET_USER_ORDERS_CLEANUP:
            return{
                ...state,
                OrderList: null,
                OrderPrice: null,
                OrderTotalCount: null,
            }

        case SET_USER_ORDER:
            return {
                ...state,
                confirmedOrder: {
                    OrderInfo: action.payload,
                    totalCount: action.totalCount
                }

            }
        case SET_USER_ORDER_ERROR:
            return{
                ...state,
                error: action.payload,
                confirmedOrder: null
            }
        case SET_USER_ORDER_CLEANUP:
            return{
                ...state,
                confirmedOrder: null,
                error: null
            }
        default:
            return state
    }
}

export default UserReducer