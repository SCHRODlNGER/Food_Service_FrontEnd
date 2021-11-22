import {HANDE_SIGNOUT,
    HANDLE_SIGNIN,
    HANDLE_SIGNIN_ERROR,
    HANDLE_SIGNUP_ERROR,
    HANDLE_SIGNUP} from "./userAccountType";

import _ from 'lodash'

const INITIAL_STATE = {
    isSignedIn: false,
    msg: null
}

const UserAuthReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case HANDLE_SIGNIN:
            return {...state, isSignedIn : true, msg: null, firstName: action.payload.firstName }
        
        case HANDLE_SIGNUP:
            return {...state, msg: null}

        case HANDE_SIGNOUT:
            return _.omit({...state, isSignedIn: false, msg: null}, 'userid')
        
        case HANDLE_SIGNIN_ERROR:
            return {...state, msg: action.payload}

        case HANDLE_SIGNUP_ERROR:
            return {...state, msg: action.payload}

        

        default:
            return state
    }
}

export default UserAuthReducer