import { ADD_PRODUCT, REMOVE_PRODUCT, SELECT_ADDRESS, SELECT_ADDRESS_CLEANUP } from "./CartType"
import removeItemOnce from "../../utils/RemoveValFromList";

const INITIAL_STATE = {
    productId: [],
    price: 0,
    address_id: null
}

let prevState;
const CartReducer = (state = INITIAL_STATE, action)=>{
    

    switch(action.type){
        case ADD_PRODUCT:{
            prevState = {...state}
            prevState.productId.push(action.payload)
            prevState.price+=action.price

            return{
                ...prevState
            }

        }
        case REMOVE_PRODUCT:{
            prevState = {...state}
            prevState.productId = removeItemOnce([...prevState.productId], action.payload)
            prevState.price-=action.price

            return{
                ...prevState
            }
        }

        case SELECT_ADDRESS:
            return{
                ...state,
                address_id: action.payload
            }

        case SELECT_ADDRESS_CLEANUP:
            return{
                ...state,
                address_id: null
            }
        default: 
            return {...state}
    }

}

export default CartReducer