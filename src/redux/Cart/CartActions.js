import { ADD_PRODUCT, REMOVE_PRODUCT, SELECT_ADDRESS, SELECT_ADDRESS_CLEANUP } from "./CartType"



export const  AddProduct = (productId, price)=>{
    return(dispatch)=>{
        dispatch({
            type: ADD_PRODUCT,
            payload: productId,
            price: price
        })
    }
}

export const RemoveProduct = (productId, price)=>{
    return (dispatch)=>{
        dispatch({
            type: REMOVE_PRODUCT,
            payload: productId,
            price: price
        })
    }
}

export const selectAddress = (address_id) =>{
    return (dispatch)=>{
        dispatch({
            type: SELECT_ADDRESS,
            payload: address_id
        })
    }
}

export const selectAddressCleanup = ()=>{
    return(dispatch)=>dispatch({
        type: SELECT_ADDRESS_CLEANUP
    })
}