import {HANDE_SIGNOUT,
    HANDLE_SIGNIN,
    HANDLE_SIGNIN_ERROR,
    HANDLE_SIGNUP_ERROR,
    HANDLE_SIGNUP} from "./userAccountType";

import _ from 'lodash'

const INITIAL_STATE = {
    isSignedIn: false,
    errorMsg: null
}

const UserReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case HANDLE_SIGNIN:
            return {...state, isSignedIn : true, errorMsg: null , userid: action.payload.userid}
        
        case HANDLE_SIGNUP:
            return {...state, isSignedIn: true , errorMsg: null, userid: action.payload.userid }

        case HANDE_SIGNOUT:
            return _.omit({...state, isSignedIn: false, errorMsg: null}, 'userid')
        
        case HANDLE_SIGNIN_ERROR:
            return {...state, errorMsg: action.payload}

        case HANDLE_SIGNUP_ERROR:
            return {...state, errorMsg: action.payload}

        default:
            return state
    }
}

export default UserReducer