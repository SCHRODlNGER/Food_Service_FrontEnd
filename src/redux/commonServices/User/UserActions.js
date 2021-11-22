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

import {
    HANDLE_TOKEN_ID
} from '../../userAccount/userAccountType'

import serviceAPI from "../../../api/service_api";

import log, { disableAll } from 'loglevel'
import history from "../../../history";
import Cookies from "js-cookie";    
import { ListGroupItem } from "react-bootstrap";


export const getUserDetails = ()=>{

    

    return async (dispatch)=>{
        log.info("[ACTION]: Getting user details")
        const token = Cookies.get(HANDLE_TOKEN_ID)
        if(token === undefined)
        {
            dispatch({
                type: GET_USER_DETAILS_ERROR,
                payload: "User not authenticated"
            })
            history.push("/signin")
        }

        const response = await serviceAPI.getUser(token).catch(err=>{
            log.info('Unable to obtain user details')
            console.log(err)
            history.push("/signin")
            dispatch({
                type: GET_USER_DETAILS_ERROR,
                payload: err.message
            })
        }) 

        console.log(response)

        try{
            if(response.data.firstname){
                log.info("obtained User Details")
                dispatch({
                    type: GET_USER_DETAILS,
                    payload: {
                        ...response.data
                    }
                })
            }
            else
                throw "getUserDetailsError"

        }
        catch{
            log.info("[ERROR]: GetUserDetailsError")
            history.push("/signin")
            dispatch({
                type: GET_USER_DETAILS_ERROR,
                payload: "User not authenticated"
            })
        }

    }

}

export const saveUserAddress = (address)=>{

    return async(dispatch)=>{

        log.info("[ACTION]: Saving User Address")
        const token = Cookies.get(HANDLE_TOKEN_ID)
        if(token === undefined)
        {
            dispatch({
                type: SET_USER_ADDRESS_ERROR,
                payload: "User not authenticated"
            })
            history.push("/signin")
        }
        
        const addressDict = {
            address: address.address,
            phone: address.phone,
            zipcode: address.zipcode
        }

        const response = await serviceAPI.saveUserAddress(addressDict, token).catch(err=>{
            log.info('Unable to save Address')
            history.push("/user")
            dispatch({
                type: SET_USER_ADDRESS_ERROR,
                payload: err.message
            })
        }) 

        console.log(response)

        try{
            if(response.status == 200){
                log.info("Saved User Address")
                history.goBack()
                dispatch({
                    type: SET_USER_ADDRESS,
                    payload: {
                        ...response.data
                    }
                })
            }
            else
                throw "setUserAddressError"

        }
        catch{
            log.info("[ERROR]: setUserAddressError")
            history.push("/user")
            dispatch({
                type: SET_USER_ADDRESS_ERROR,
                payload: "Unable to save address"
            })
        }

    }

}


export const getUserAddress = ()=>{

    return async(dispatch)=>{

        log.info("[ACTION]: Getting User Address")
        const token = Cookies.get(HANDLE_TOKEN_ID)
        if(token === undefined)
        {
            dispatch({
                type: GET_USER_ADDRESS_ERROR,
                payload: "User not authenticated"
            })
            history.push("/signin")
        }
        
        
        const response = await serviceAPI.viewUserAddresses(token).catch(err=>{
            log.info('Unable to get Address')
            console.log(err)
            history.push("/user")
            dispatch({
                type: GET_USER_ADDRESS,
                payload: err.message
            })
        }) 

        console.log(response)

        try{
            if(response.status === 200){
                log.info("obtained User Addresses")
                const addressList = [];
                // console.log(type(response.data.addressInfoList))
                for(let key in response.data.addressInfoList){
                    addressList.push(response.data.addressInfoList[key])
                }
                
                dispatch({
                    type: GET_USER_ADDRESS,
                    payload: [
                        ...addressList
                    ]
                })
            }
            else{
                console.log(response.status)
                throw "getUserAddressError"
            }

        }
        catch{
            log.info("[ERROR]: getUserAddressError")
            dispatch({
                type: GET_USER_ADDRESS_ERROR,
                payload: "Unable to get address"
            })
        }

    }

}

export const getUserOrders = ()=>{
    return async(dispatch)=>{
        log.info("[ACTION]: Getting User Action")

        const token = Cookies.get(HANDLE_TOKEN_ID)
        if(token === undefined)
        {
            dispatch({
                type: GET_USER_ORDERS_ERROR,
                payload: "User not authenticated"
            })
            history.push("/signin")
        }
        const response = await serviceAPI.getOrderDetails(token).catch(err=>{
            dispatch({
                type: GET_USER_ORDERS_ERROR,
                payload: err.message
            })
        })
        try{
            if(response.status === 200){

                const orderList =  [];
                for(let key in response.data.orderInfoList){
                    orderList.push(response.data.orderInfoList[key])
                    console.log(response.data.orderInfoList[key])
                }
                console.log(orderList[0])
                dispatch({
                    type: GET_USER_ORDERS,
                    payload: [...orderList],
                    price: response.data.price,
                    totalCount: response.data.totalCount,
                })
            }
            else
                throw "Unable to get Order Details"
        }catch{
            dispatch({
                type: GET_USER_ORDERS_ERROR,
                payload: "Unable to get Order Details"
            })
        }

    }
}

export const orderDetailsCleanup = ()=>{
    return (dispatch)=>{
        dispatch({
            type: GET_USER_ORDERS_CLEANUP
        })
    }
}

export const makeOrder = (address_id, recipe_ids)=>{
    return async(dispatch)=>{
        log.info("[ACTION] Making an Order")

        if(recipe_ids.length === 0){
            dispatch({
                type: SET_USER_ORDER_ERROR,
                payload: "Empty Cart"
            })
        }

        const token = Cookies.get(HANDLE_TOKEN_ID)
        if(token === undefined)
        {
            dispatch({
                type: SET_USER_ORDER_ERROR,
                payload: "User not authenticated"
            })
            history.push("/signin")
        }

        const orderDict = {
            address_id: address_id,
            recipeIds: [...recipe_ids]
        }

        const response = await serviceAPI.saveUserOrder(orderDict, token).catch(err=>{
            log.error("[Error] Could not place order: " + err.message)
            dispatch({
                type: SET_USER_ORDER_ERROR,
                payload: err.message
            })
        })

        try{
            if(response.status === 200){
                const orderList =  [];
                for(let key in response.data.orderInfoList){
                    orderList.push(response.data.orderInfoList[key])
                }
                dispatch({
                    type: SET_USER_ORDER,
                    payload: orderList[0],
                    totalCount: response.data.totalCount,
                })
            }
            else{
                throw "Unable to make Order"
            }
        }catch{
            dispatch({
                type: SET_USER_ORDER_ERROR,
                payload: "Unable to get response"
            })
        }


    }
}


export const makeOrderCleanup = ()=>{
    return (dispatch)=>{
        dispatch({
            type: SET_USER_ORDER_CLEANUP
        })
    }
}